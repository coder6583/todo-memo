import { TaskListViewType } from "@/typings/tasklist";

const updateRemoveList = (
  data: TaskListViewType[],
  workspaceIndex: number,
  listIndex: number
): TaskListViewType[] | null => {
  const workspace = data.at(workspaceIndex);
  if (!workspace) {
    return null;
  }
  if (!workspace.tasklistlist) {
    return null;
  }
  return [
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
};

export default updateRemoveList;
