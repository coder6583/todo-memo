import { TaskListType, TaskListViewType } from "@/typings/tasklist";

const updateListName = (
  data: TaskListViewType[],
  workspaceIndex: number,
  listIndex: number,
  newName: string
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
      name: newName,
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

export default updateListName;
