export type MemoType = {
  id: string;
  title?: string;
  date: number;
  content: string;
  type: "text" | "markdown";
};

export type TaskStateType = "todo" | "ondeck" | "done";

export type TaskType = {
  id: string;
  name: string;
  date: number;
  state: TaskStateType;
  initialized: boolean;
  duedate?: number;
  expectedTime?: number;
  memolist: MemoType[];
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
  workspaceIndex?: number;
  listIndex?: number;
  taskIndex?: number;
  taskState?: TaskStateType;
  memoIndex?: number;
  editHandler?: () => void;
};

export type UserType = {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  workspaces: TaskListViewType[];
};

export type WorkspaceIndexType = number | "home";
