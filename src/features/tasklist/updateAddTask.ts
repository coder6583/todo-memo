import {
  TaskListType,
  TaskListViewType,
  TaskType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateAddTask = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  listIndex: number
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
  if ((workspace.tasklistlist ?? []).length <= listIndex) {
    return null;
  }
  const tasklist = workspace.tasklistlist.at(listIndex);
  if (!tasklist) {
    return null;
  }
  const newTask: TaskType = {
    date: Date.now(),
    id: v4(),
    name: "",
    state: "todo",
    initialized: false,
    memolist: [],
  };
  const newTaskList: TaskListType = {
    ...tasklist,
    tasklist: {
      ...tasklist.tasklist,
      todo: tasklist.tasklist.todo.concat(newTask),
    },
  };
  const newData = [
    ...data.slice(0, workspaceIndex),
    {
      ...workspace,
      tasklistlist: [
        ...(workspace.tasklistlist?.slice(0, listIndex) ?? []),
        newTaskList,
        ...(workspace.tasklistlist?.slice(listIndex + 1) ?? []),
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

export default updateAddTask;
