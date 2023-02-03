import {
  TaskListType,
  TaskListViewType,
  TaskStateType,
} from "@/typings/tasklist";

const updateTaskName = (
  data: TaskListViewType,
  listIndex: number,
  taskIndex: number,
  state: TaskStateType,
  newName: string
): TaskListViewType | null => {
  if (!data.tasklistlist) {
    return null;
  }
  if (data.tasklistlist.length > listIndex) {
    const newTaskList = {
      ...data.tasklistlist.at(listIndex),
      tasklist: {
        ...data.tasklistlist.at(listIndex)?.tasklist,
        [state]: (data.tasklistlist.at(listIndex)?.tasklist[state] ?? []).map(
          (task, index) => {
            if (index == taskIndex) {
              return {
                ...task,
                name: newName,
              };
            } else {
              return task;
            }
          }
        ),
      },
    } as TaskListType;
    return {
      ...data,
      tasklistlist: data.tasklistlist.map((tasklist, index) => {
        if (index == listIndex) {
          return newTaskList;
        } else {
          return tasklist;
        }
      }),
    };
  }
  return null;
};

export default updateTaskName;
