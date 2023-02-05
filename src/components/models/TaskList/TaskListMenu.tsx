import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import updateAddTask from "@/features/tasklist/updateAddTask";
import updateDuplicateList from "@/features/tasklist/updateDuplicateList";
import updateRemoveList from "@/features/tasklist/updateRemoveList";
import { MenuComponentProps } from "@/typings/tasklist";
import {
  AddCircleOutline,
  ContentCopy,
  DeleteOutline,
  Edit,
} from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC } from "react";
import { useRecoilState } from "recoil";

const TaskListMenu: FC<MenuComponentProps> = ({ handleClose, listIndex }) => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex, setWorkspaceIndex] =
    useRecoilState(WorkspaceIndexState);
  if (listIndex == undefined) {
    return null;
  }
  return (
    <>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText>Edit List</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          const newWorkspaces = updateDuplicateList(
            data.workspaces,
            workspaceIndex,
            listIndex
          );
          if (newWorkspaces) {
            setData({ ...data, workspaces: newWorkspaces });
          }
          handleClose();
        }}
      >
        <ListItemIcon>
          <ContentCopy />
        </ListItemIcon>
        <ListItemText>Duplicate List</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          const newWorkspaces = updateAddTask(
            data.workspaces,
            workspaceIndex,
            listIndex
          );
          if (newWorkspaces) {
            setData({ ...data, workspaces: newWorkspaces });
          }
          handleClose();
        }}
      >
        <ListItemIcon>
          <AddCircleOutline />
        </ListItemIcon>
        <ListItemText>Add Task</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          const newWorkspaces = updateRemoveList(
            data.workspaces,
            workspaceIndex,
            listIndex
          );
          if (newWorkspaces) {
            setData({ ...data, workspaces: newWorkspaces });
          }
          handleClose();
        }}
        className="text-red-600"
      >
        <ListItemIcon className="text-red-600">
          <DeleteOutline />
        </ListItemIcon>
        <ListItemText>Delete List</ListItemText>
      </MenuItem>
    </>
  );
};

export default TaskListMenu;
