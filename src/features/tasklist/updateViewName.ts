import { TaskListViewType } from "@/typings/tasklist";

const updateViewName = (
  data: TaskListViewType[],
  index: number,
  newName: string
): TaskListViewType[] | null => {
  const workspace = data.at(index);
  if (!workspace?.tasklistlist) {
    return null;
  }
  return [
    ...data.slice(0, index),
    {
      ...workspace,
      name: newName,
    },
    ...data.slice(index + 1),
  ];
};

export default updateViewName;
