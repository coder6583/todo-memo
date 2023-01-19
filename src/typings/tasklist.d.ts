export type MemoType = {
  title?: string;
  date: Number;
  content: string;
};

export type TaskType = {
  name: string;
  date: Number;
  duedate?: Number;
  expectedTime?: Number;
  checked: boolean;
  memolist: MemoType[];
};

export type TaskListType = {
  name: string;
  tasklist: TaskType[];
};

export type TaskListViewType = {
  tasklistlist: TaskListType[];
};
