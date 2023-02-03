import { TaskListViewType } from "@/typings/tasklist";
import { atom, RecoilState } from "recoil";

const WorkspacesState: RecoilState<TaskListViewType[]> = atom({
  key: "Workspaces",
  default: [] as TaskListViewType[],
});

const WorkspaceIndexState: RecoilState<number> = atom({
  key: "WorkspaceIndex",
  default: 0,
});

const AddListButtonState: RecoilState<boolean> = atom({
  key: "AddListbutton",
  default: false,
});

export { WorkspacesState, WorkspaceIndexState, AddListButtonState };
