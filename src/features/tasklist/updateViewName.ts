import { TaskListViewType, WorkspaceIndexType } from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateViewName = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  newName: string
): Promise<TaskListViewType[] | null> => {
  if (typeof workspaceIndex !== "number") {
    return null;
  }
  const workspace = data.at(workspaceIndex);
  if (!workspace?.tasklistlist) {
    return null;
  }
  const newData = [
    ...data.slice(0, workspaceIndex),
    {
      ...workspace,
      name: newName,
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

export default updateViewName;
