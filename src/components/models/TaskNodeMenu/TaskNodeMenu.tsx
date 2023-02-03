import {
  WorkspaceIndexState,
  WorkspacesState,
} from "@/features/recoil/tasklist";
import updateDuplicateTask from "@/features/tasklist/updateDuplicateTask";
import updateRemoveTask from "@/features/tasklist/updateRemoveTask";
import { MenuComponentProps } from "@/typings/tasklist";
import { ContentCopy, DeleteOutline, Edit } from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC } from "react";
import { useRecoilState } from "recoil";

const TaskNodeMenu: FC<MenuComponentProps> = ({
  handleClose,
  listIndex,
  taskIndex,
  taskState,
}) => {
  const [data, setData] = useRecoilState(WorkspacesState);
  const [workspaceIndex, setWorkspaceIndex] =
    useRecoilState(WorkspaceIndexState);
  if (
    listIndex == undefined ||
    taskIndex == undefined ||
    taskState == undefined
  ) {
    return null;
  }
  return (
    <>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText>Edit Task</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          const newData = updateDuplicateTask(
            data,
            workspaceIndex,
            listIndex,
            taskIndex,
            taskState
          );
          if (newData) {
            setData(newData);
          }
          handleClose();
        }}
      >
        <ListItemIcon>
          <ContentCopy />
        </ListItemIcon>
        <ListItemText>Duplicate Task</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          const newData = updateRemoveTask(
            data,
            workspaceIndex,
            listIndex,
            taskIndex,
            taskState
          );
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
        <ListItemText>Delete Task</ListItemText>
      </MenuItem>
    </>
  );
};

export default TaskNodeMenu;
