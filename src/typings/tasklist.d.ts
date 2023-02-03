export type MemoType = {
  id: string;
  title?: string;
  date: Number;
  content: string;
};

export type TaskStateType = "todo" | "ondeck" | "done";

export type TaskType = {
  id: string;
  name: string;
  date: Number;
  state: TaskStateType;
  initialized: boolean;
  duedate?: Number;
  expectedTime?: Number;
  memolist?: MemoType[];
};

export type TaskListType = {
  id: string;
  name: string;
  tagColor: string;
  tasklist: {
    todo: TaskType[];
    ondeck: TaskType[];
    done: TaskType[];
  };
};

export type TaskListViewType = {
  name: string;
  tasklistlist?: TaskListType[];
};

export type MenuComponentProps = {
  handleClose: () => void;
  listIndex?: number;
  taskIndex?: number;
  taskState?: TaskStateType;
};
