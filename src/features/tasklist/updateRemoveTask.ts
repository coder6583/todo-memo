import {
  TaskListType,
  TaskListViewType,
  TaskStateType,
} from "@/typings/tasklist";
import { v4 } from "uuid";

const updateRemoveTask = (
  data: TaskListViewType[],
  workspaceIndex: number,
  listIndex: number,
  taskIndex: number,
  taskState: TaskStateType
) => {
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
  return [
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
};

export default updateRemoveTask;