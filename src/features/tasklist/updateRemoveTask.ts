import {
  TaskListType,
  TaskListViewType,
  TaskStateType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateRemoveTask = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  listIndex: number,
  taskIndex: number,
  taskState: TaskStateType
) => {
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
  const tasklist = workspace.tasklistlist.at(listIndex);
  if (!tasklist) {
    return null;
  }
  const newTasklist = {
    ...tasklist,
    id: v4(),
    tasklist: {
      ...tasklist.tasklist,
      [taskState]: [
        ...tasklist.tasklist[taskState].slice(0, taskIndex),
        ...tasklist.tasklist[taskState].slice(taskIndex + 1),
      ],
    },
  } as TaskListType;
  const newData = [
    ...data.slice(0, workspaceIndex),
    {
      ...workspace,
      tasklistlist: [
        ...workspace.tasklistlist.slice(0, listIndex),
        newTasklist,
        ...workspace.tasklistlist.slice(listIndex + 1),
      ],
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
};

export default updateRemoveTask;
