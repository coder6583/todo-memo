import { TaskListViewType } from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateAddWorkspace = async (
  data: TaskListViewType[],
  name: string
): Promise<TaskListViewType[]> => {
  const newData = data.concat({ name: name, tasklistlist: [] });
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

export { updateAddWorkspace };
