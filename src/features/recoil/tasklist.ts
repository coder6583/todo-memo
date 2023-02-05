import { TaskListViewType, UserType } from "@/typings/tasklist";
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

const WorkspaceIndexState: RecoilState<number> = atom({
  key: "WorkspaceIndex",
  default: 0,
});

const AddListButtonState: RecoilState<boolean> = atom({
  key: "AddListbutton",
  default: false,
});

export { UserState, WorkspaceIndexState, AddListButtonState };
