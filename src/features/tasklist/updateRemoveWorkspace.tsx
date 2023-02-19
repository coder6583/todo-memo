import { TaskListViewType } from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateRemoveWorkspace = async (
  data: TaskListViewType[],
  workspaceIndex: number
) => {
  if (0 <= workspaceIndex && workspaceIndex < data.length) {
    const newData = [
      ...data.slice(0, workspaceIndex),
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
  } else {
    return null;
  }
};

export default updateRemoveWorkspace;
