import {
  TaskListViewType,
  UserType,
  WorkspaceIndexType,
} from "@/typings/tasklist";
import { atom, RecoilState } from "recoil";

const UserState: RecoilState<UserType> = atom({
  key: "User",
  default: {
    name: "",
    email: "",
    avatar: "",
    uid: "",
    workspaces: [] as TaskListViewType[],
  },
});

const WorkspaceIndexState: RecoilState<WorkspaceIndexType> = atom({
  key: "WorkspaceIndex",
  default: "home" as WorkspaceIndexType,
});

const AddListButtonState: RecoilState<boolean> = atom({
  key: "AddListbutton",
  default: false,
});

const WorkspaceExpandState: RecoilState<boolean> = atom({
  key: "WorkspaceExpand",
  default: false,
});

export {
  UserState,
  WorkspaceIndexState,
  AddListButtonState,
  WorkspaceExpandState,
};
