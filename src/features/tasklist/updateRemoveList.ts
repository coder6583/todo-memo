import { TaskListViewType, WorkspaceIndexType } from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateRemoveList = async (
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
  const newData = [
    ...data.slice(0, workspaceIndex),
    {
      ...workspace,
      tasklistlist: [
        ...workspace.tasklistlist.slice(0, listIndex),
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

export default updateRemoveList;
