import {
  WorkspaceIndexState,
  WorkspacesState,
} from "@/features/recoil/tasklist";
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
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, MouseEvent } from "react";
import { useRecoilState } from "recoil";

const TaskListMenu: FC<MenuComponentProps> = ({ handleClose, listIndex }) => {
  const [data, setData] = useRecoilState(WorkspacesState);
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
          const newData = updateDuplicateList(data, workspaceIndex, listIndex);
          if (newData) {
            setData(newData);
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
          const newData = updateAddTask(data, workspaceIndex, listIndex);
          if (newData) {
            setData(newData);
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
          const newData = updateRemoveList(data, workspaceIndex, listIndex);
          if (newData) {
            setData(newData);
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
