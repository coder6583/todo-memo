import { TaskListType, TaskListViewType, TaskType } from "@/typings/tasklist";
import { v4 } from "uuid";

const updateAddTask = (
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
  if ((workspace.tasklistlist ?? []).length <= listIndex) {
    return null;
  }
  const tasklist = workspace.tasklistlist.at(listIndex);
  if (!tasklist) {
    return null;
  }
  const newTask: TaskType = {
    date: Date.now(),
    id: v4(),
    name: "",
    state: "todo",
    initialized: false,
  };
  const newTaskList: TaskListType = {
    ...tasklist,
    tasklist: {
      ...tasklist.tasklist,
      todo: tasklist.tasklist.todo.concat(newTask),
    },
  };

  return [
    ...data.slice(0, workspaceIndex),
    {
      ...workspace,
      tasklistlist: [
        ...(workspace.tasklistlist?.slice(0, listIndex) ?? []),
        newTaskList,
        ...(workspace.tasklistlist?.slice(listIndex + 1) ?? []),
      ],
    },
    ...data.slice(workspaceIndex + 1),
  ];
};

export default updateAddTask;
