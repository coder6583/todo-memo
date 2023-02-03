import {
  TaskListType,
  TaskListViewType,
  TaskStateType,
  TaskType,
} from "@/typings/tasklist";

const updateTask = (
  data: TaskListViewType[],
  workspaceIndex: number,
  listIndex: number,
  taskIndex: number,
  state: TaskStateType,
  newTask: TaskType
): TaskListViewType[] | null => {
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
      tasklist: {
        ...workspace.tasklistlist.at(listIndex)?.tasklist,
        [state]: (
          workspace.tasklistlist.at(listIndex)?.tasklist[state] ?? []
        ).map((task, index) => {
          if (index == taskIndex) {
            return newTask;
          } else {
            return task;
          }
        }),
      },
    } as TaskListType;
    return [
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
  }
  return null;
};

export default updateTask;
