import HorizMenu from "@/components/ui/HorizMenu";
import { WorkspaceIndexState } from "@/features/recoil/tasklist";
import { TaskListViewType } from "@/typings/tasklist";
import { Wysiwyg } from "@mui/icons-material";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import WorkspaceMenu from "./WorkspaceMenu";

type WorkspaceListItemProps = {
  workspace: TaskListViewType;
  i: number;
};

const WorkspaceListItem: FC<WorkspaceListItemProps> = ({ workspace, i }) => {
  const [workspaceIndex, setIndex] = useRecoilState(WorkspaceIndexState);

  return (
    <ListItem
      className="p-0"
      key={workspace.name}
      sx={{ backgroundColor: workspaceIndex === i ? "#DDDDDD" : "FFFFFF" }}
    >
      <ListItemButton
        onClick={() => {
          setIndex(i);
        }}
      >
        <ListItemIcon>
          <Wysiwyg />
        </ListItemIcon>
        <ListItemText primary={workspace.name} />
      </ListItemButton>
      {/*Hover and show button*/}
      <ListItemSecondaryAction>
        <Box component="div">
          <HorizMenu
            MenuComponent={WorkspaceMenu}
            menuComponentProps={{ workspaceIndex: i }}
          />
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default WorkspaceListItem;
