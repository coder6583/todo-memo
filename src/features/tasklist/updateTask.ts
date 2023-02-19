import {
  TaskListType,
  TaskListViewType,
  TaskStateType,
  TaskType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateTask = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  listIndex: number,
  taskIndex: number,
  state: TaskStateType,
  newTask: TaskType
): Promise<TaskListViewType[] | null> => {
  if (typeof workspaceIndex !== "number") {
    return null;
  }
  const workspace = data.at(workspaceIndex);
  if (!workspace) {
    return null;
  }
  if (!workspace.tasklistlist) {
    return null;
  }
  if (workspace.tasklistlist.length > listIndex) {
    const newTaskList = {
      ...workspace.tasklistlist.at(listIndex),
      tasklist: {
        ...workspace.tasklistlist.at(listIndex)?.tasklist,
        [state]: (
          workspace.tasklistlist.at(listIndex)?.tasklist[state] ?? []
        ).map((task, index) => {
          if (index == taskIndex) {
            return newTask;
          } else {
            return task;
          }
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

export default updateTask;
