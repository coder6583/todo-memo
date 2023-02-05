import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
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
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
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
          const newWorkspaces = updateDuplicateTask(
            data.workspaces,
            workspaceIndex,
            listIndex,
            taskIndex,
            taskState
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
        <ListItemText>Duplicate Task</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          const newWorkspaces = updateRemoveTask(
            data.workspaces,
            workspaceIndex,
            listIndex,
            taskIndex,
            taskState
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
        <ListItemText>Delete Task</ListItemText>
      </MenuItem>
    </>
  );
};

export default TaskNodeMenu;
