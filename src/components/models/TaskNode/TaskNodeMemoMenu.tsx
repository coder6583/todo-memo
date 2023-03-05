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

const TaskNodeMemoMenu: FC<MenuComponentProps> = ({
  handleClose,
  listIndex,
  taskIndex,
  taskState,
  memoIndex,
  editHandler,
}) => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex, setWorkspaceIndex] =
    useRecoilState(WorkspaceIndexState);
  if (listIndex == undefined) {
    return null;
  }
  return (
    <>
      <MenuItem
        onClick={() => {
          if (editHandler) {
            editHandler();
          }
        }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <ListItemText>Edit Memo</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          updateDuplicateList(data.workspaces, workspaceIndex, listIndex).then(
            (newWorkspaces) => {
              if (newWorkspaces) {
                setData({ ...data, workspaces: newWorkspaces });
              }
              handleClose();
            }
          );
        }}
      >
        <ListItemIcon>
          <ContentCopy />
        </ListItemIcon>
        <ListItemText>Duplicate Memo</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          updateRemoveList(data.workspaces, workspaceIndex, listIndex).then(
            (newWorkspaces) => {
              if (newWorkspaces) {
                setData({ ...data, workspaces: newWorkspaces });
              }
              handleClose();
            }
          );
        }}
        className="text-red-600"
      >
        <ListItemIcon className="text-red-600">
          <DeleteOutline />
        </ListItemIcon>
        <ListItemText>Delete Memo</ListItemText>
      </MenuItem>
    </>
  );
};

export default TaskNodeMemoMenu;
