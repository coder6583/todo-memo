import {
  TaskListType,
  TaskListViewType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateListName = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  listIndex: number,
  newName: string
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
      name: newName,
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

export default updateListName;
