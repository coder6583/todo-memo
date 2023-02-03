import { TaskListViewType } from "@/typings/tasklist";
import { v4 } from "uuid";

const updateDuplicateList = (
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
  const tasklist = workspace.tasklistlist.at(listIndex);
  if (!tasklist) {
    return null;
  }
  return [
    ...data.slice(0, workspaceIndex),
    {
      ...workspace,
      tasklistlist: [
        ...workspace.tasklistlist.slice(0, listIndex + 1),
        {
          ...tasklist,
          id: v4(),
        },
        ...workspace.tasklistlist.slice(listIndex + 1),
      ],
    },
    ...data.slice(workspaceIndex + 1),
  ];
};

export default updateDuplicateList;
