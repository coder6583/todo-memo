import {
  TaskListType,
  TaskListViewType,
  TaskType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { doc, updateDoc } from "firebase/firestore";
import { DropResult } from "react-beautiful-dnd";
import db, { auth } from "../firebase/firebase";
import { userConverter } from "../firebase/firestore";
import { checkStateType, insertTask } from "./utils";

const updateListDrag = async (
  data: TaskListViewType[],
  workspaceIndex: WorkspaceIndexType,
  result: DropResult
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
  if (!result.destination) {
    return null;
  }
  if (result.destination == result.source) {
    return null;
  }
  const destIndex = workspace.tasklistlist.findIndex((tl) =>
    result.destination?.droppableId.startsWith(tl.id)
  ); //index of dest list
  const sourceIndex = workspace.tasklistlist.findIndex((tl) =>
    result.source.droppableId.startsWith(tl.id)
  ); // index of source list
  const sourceState = result.source.droppableId.replace(
    workspace.tasklistlist.at(sourceIndex)?.id ?? "",
    ""
  ); // state of dest as string
  const destState = result.destination?.droppableId.replace(
    workspace.tasklistlist.at(destIndex)?.id ?? "",
    ""
  ); // state of dest as string
  if (!checkStateType(destState)) {
    console.error(`${destState} is not a state.`);
    return null;
  }
  if (!checkStateType(sourceState)) {
    console.error(`${sourceState} is not a state.`);
    return null;
  }
  const sourceList =
    workspace.tasklistlist.at(sourceIndex)?.tasklist[sourceState] ?? [];
  const destList =
    workspace.tasklistlist.at(destIndex)?.tasklist[destState] ?? [];
  const [task] = sourceList.slice(result.source.index, result.source.index + 1);
  if (!task) {
    console.error(
      `A task does not exist at ${result.source.index} in ${sourceList}`
    );
    return null;
  }
  const newtask: TaskType = {
    ...task,
    state: destState,
  };
  let newData: TaskListViewType[] | null;
  if (sourceIndex != destIndex) {
    const newSourceTaskList = {
      ...workspace.tasklistlist.at(sourceIndex),
      tasklist: {
        ...workspace.tasklistlist.at(sourceIndex)?.tasklist,
        [sourceState]: sourceList.filter((_, i) => i != result.source.index),
      },
    } as TaskListType;
    const newdestTaskList = {
      ...workspace.tasklistlist.at(destIndex),
      tasklist: {
        ...workspace.tasklistlist.at(destIndex)?.tasklist,
        [destState]: insertTask(destList, newtask, result.destination?.index),
      },
    } as TaskListType;
    newData = [
      ...data.slice(0, workspaceIndex),
      {
        ...workspace,
        tasklistlist: workspace.tasklistlist
          .map((tasklist, i) =>
            i == sourceIndex ? newSourceTaskList : tasklist
          )
          .map((tasklist, i) => (i == destIndex ? newdestTaskList : tasklist)),
      },
      ...data.slice(workspaceIndex + 1),
    ];
  } else if (sourceIndex == destIndex && sourceState == destState) {
    const newSourceList = sourceList.filter((_, i) => i != result.source.index);
    const newdestTaskList = {
      ...workspace.tasklistlist.at(destIndex),
      tasklist: {
        ...workspace.tasklistlist.at(destIndex)?.tasklist,
        [destState]: insertTask(
          newSourceList,
          newtask,
          result.destination?.index
        ),
      },
    } as TaskListType;
    newData = [
      ...data.slice(0, workspaceIndex),
      {
        ...workspace,
        tasklistlist: workspace.tasklistlist.map((tasklist, index) =>
          index == destIndex ? newdestTaskList : tasklist
        ),
      },
      ...data.slice(workspaceIndex + 1),
    ];
  } else if (sourceIndex == destIndex && sourceState != destState) {
    const newdestTaskList = {
      ...workspace.tasklistlist.at(destIndex),
      tasklist: {
        ...workspace.tasklistlist.at(destIndex)?.tasklist,
        [sourceState]: sourceList.filter((_, i) => i != result.source.index),
        [destState]: insertTask(destList, newtask, result.destination?.index),
      },
    } as TaskListType;
    newData = [
      ...data.slice(0, workspaceIndex),
      {
        ...workspace,
        tasklistlist: workspace.tasklistlist.map((tasklist, index) =>
          index == destIndex ? newdestTaskList : tasklist
        ),
      },
      ...data.slice(workspaceIndex + 1),
    ];
  } else {
    newData = null;
  }
  if (auth.currentUser && newData) {
    const userRef = doc(db, "users", auth.currentUser.uid).withConverter(
      userConverter
    );
    await updateDoc(userRef, {
      workspaces: newData,
    });
  }
  return newData;
};

export { updateListDrag };
