import {
  TaskListType,
  TaskListViewType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";

const updateAddList = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  newName?: string
): Promise<TaskListViewType[] | null> => {
  if (typeof workspaceIndex !== "number") {
    return null;
  }
  const newId = v4();
  const newList: TaskListType = {
    id: newId,
    name: newName ?? "Untitled List",
    tagColor: "#225577",
    tasklist: {
      todo: [],
      ondeck: [],
      done: [],
    },
  };
  const workspace = data.at(workspaceIndex);
  if (!workspace?.tasklistlist) {
    return null;
  }
  const newData = [
    ...data.slice(0, workspaceIndex),
    {
      name: workspace.name,
      tasklistlist: (workspace.tasklistlist ?? []).concat([newList]),
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

export default updateAddList;
