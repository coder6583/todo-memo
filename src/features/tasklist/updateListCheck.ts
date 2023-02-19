import {
  TaskListType,
  TaskListViewType,
  TaskStateType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";
import { updateState } from "./utils";

const updateListCheck = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  listIndex: number,
  taskIndex: number,
  state: TaskStateType
): Promise<TaskListViewType[] | null> => {
  if (typeof workspaceIndex !== "number") {
    return null;
  }
  const workspace = data.at(workspaceIndex);
  if (!workspace?.tasklistlist) {
    return null;
  }
  const sourceList =
    workspace.tasklistlist?.at(listIndex)?.tasklist[state] ?? [];
  const [task] = sourceList.slice(taskIndex, taskIndex + 1);
  if (workspace.tasklistlist.length > listIndex && state != "done") {
    const destList =
      workspace.tasklistlist.at(listIndex)?.tasklist[updateState(state)] ?? [];
    const newTaskList = {
      ...workspace.tasklistlist.at(listIndex),
      tasklist: {
        ...workspace.tasklistlist.at(listIndex)?.tasklist,
        [state]: sourceList.filter((_, i) => i != taskIndex),
        [updateState(state)]: destList.concat({
          ...task,
          state: updateState(task.state),
        }),
      },
    } as TaskListType;
    const newData = [
      ...data.slice(0, workspaceIndex),
      {
        ...workspace,
        tasklistlist: workspace.tasklistlist.map((tasklist, index) => {
          if (index == listIndex) {
            return newTaskList;
          } else {
            return tasklist;
          }
        }),
      },
      ...data.slice(workspaceIndex + 1),
    ];
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid).withConverter(
        userConverter
      );
      await updateDoc(userRef, {
        workspaces: newData,
      });
    }
    return newData;
  }
  return null;
};

export { updateListCheck };
