import { TaskListType, TaskListViewType } from "@/typings/tasklist";
import { v4 } from "uuid";

const updateAddList = (
  data: TaskListViewType[],
  workspaceIndex: number,
  newName?: string
): TaskListViewType[] | null => {
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
  return [
    ...data.slice(0, workspaceIndex),
    {
      name: workspace.name,
      tasklistlist: (workspace.tasklistlist ?? []).concat([newList]),
    },
    ...data.slice(workspaceIndex + 1),
  ];
};

export default updateAddList;
