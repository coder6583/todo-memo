import {
  TaskListType,
  TaskListViewType,
  TaskStateType,
} from "@/typings/tasklist";
import { updateState } from "./utils";

const updateListCheck = (
  data: TaskListViewType[],
  workspaceIndex: number,
  listIndex: number,
  taskIndex: number,
  state: TaskStateType
): TaskListViewType[] | null => {
  const workspace = data.at(workspaceIndex);
  if (!workspace?.tasklistlist) {
    return null;
  }
  const sourceList =
    workspace.tasklistlist?.at(listIndex)?.tasklist[state] ?? [];
  const [task] = sourceList.slice(taskIndex, taskIndex + 1);
  console.log(workspace.tasklistlist.length, "listIndex", listIndex);
  if (workspace.tasklistlist.length > listIndex && state != "done") {
    const destList =
      workspace.tasklistlist.at(listIndex)?.tasklist[updateState(state)] ?? [];
    const newTaskList = {
      ...workspace.tasklistlist.at(listIndex),
      tasklist: {
        ...workspace.tasklistlist.at(listIndex)?.tasklist,
        [state]: sourceList.filter((_, i) => i != taskIndex),
        [updateState(state)]: destList.concat({
          ...task,
          state: updateState(task.state),
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

export { updateListCheck };
