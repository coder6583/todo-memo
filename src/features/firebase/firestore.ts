import { TaskListType, TaskListViewType, UserType } from "@/typings/tasklist";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

const checkUserType = (data: any): data is UserType => {
  return (
    typeof data.name === "string" &&
    typeof data.avatar === "string" &&
    typeof data.email === "string" &&
    typeof data.uid === "string" &&
    typeof data.workspaces === "object"
  );
};

const userConverter = {
  toFirestore(user: UserType): DocumentData {
    return {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      uid: user.uid,
      workspaces: user.workspaces,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserType {
    const data = snapshot.data(options);
    if (!checkUserType(data)) {
      console.error(data);
      throw new Error("invalid user");
    }

    return {
      name: data.name,
      avatar: data.avatar,
      email: data.email,
      uid: data.uid,
      workspaces: data.workspaces,
    };
  },
};

const checkWorkspacesType = (data: any): data is TaskListViewType[] => {
  return typeof data === "object";
};

const workspacesConverter = {
  toFirestore(workspaces: TaskListViewType[]): DocumentData {
    return workspaces;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): TaskListViewType[] {
    const data = snapshot.data(options);
    if (!checkWorkspacesType(data)) {
      console.error(data);
      throw new Error("invalid workspaces");
    }

    return data;
  },
};

const checkTaskListListType = (data: any): data is TaskListType[] => {
  return typeof data === "object";
};

const tasklistlistConverter = {
  toFirestore(tasklistlist: TaskListType[]): DocumentData {
    return tasklistlist;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): TaskListType[] {
    const data = snapshot.data(options);
    if (!checkTaskListListType(data)) {
      console.error(data);
      throw new Error("invalid tasklistlist");
    }

    return data;
  },
};

const checkWorkspaceType = (data: any): data is TaskListViewType => {
  return typeof data.name === "string" && typeof data.tasklistlist === "object";
};

const workspaceConverter = {
  toFirestore(workspace: TaskListViewType): DocumentData {
    return {
      name: workspace.name,
      tasklistlist: workspace.tasklistlist,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): TaskListViewType {
    const data = snapshot.data(options);
    if (!checkWorkspaceType(data)) {
      console.error(data);
      throw new Error("invalid workspaces");
    }

    return {
      name: data.name,
      tasklistlist: data.tasklistlist,
    };
  },
};

export {
  checkUserType,
  userConverter,
  workspacesConverter,
  workspaceConverter,
  tasklistlistConverter,
};
