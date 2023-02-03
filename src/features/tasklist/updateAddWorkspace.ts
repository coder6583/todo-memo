import { TaskListViewType } from "@/typings/tasklist";

const updateAddWorkspace = (
  data: TaskListViewType[],
  name: string
): TaskListViewType[] => {
  return data.concat({ name: name, tasklistlist: [] });
};

export { updateAddWorkspace };
