import { MenuComponentProps } from "@/typings/tasklist";
import { DeleteOutline } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC } from "react";

const WorkspaceMenu: FC<MenuComponentProps> = ({ handleClose }) => {
  return (
    <MenuItem onClick={handleClose} className="text-red-600">
      <ListItemIcon className="text-red-600">
        <DeleteOutline />
      </ListItemIcon>
      <ListItemText>Delete Workspace</ListItemText>
    </MenuItem>
  );
};

export default WorkspaceMenu;
