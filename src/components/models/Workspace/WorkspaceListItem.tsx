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
import styles from "./Workspace.module.css";

type WorkspaceListItemProps = {
  workspace: TaskListViewType;
  i: number;
};

const WorkspaceListItem: FC<WorkspaceListItemProps> = ({ workspace, i }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [workspaceIndex, setIndex] = useRecoilState(WorkspaceIndexState);

  return (
    <ListItem
      className="p-0"
      key={workspace.name}
      sx={{ backgroundColor: workspaceIndex === i ? "#DDDDDD" : "FFFFFF" }}
    >
      <div className={styles.listItem}>
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
        <ListItemSecondaryAction>
          <div
            className={styles.horizMenu}
            style={{ display: menuOpen ? "block" : "" }}
          >
            <HorizMenu
              MenuComponent={WorkspaceMenu}
              menuComponentProps={{ workspaceIndex: i }}
              setMenuOpen={setMenuOpen}
            />
          </div>
        </ListItemSecondaryAction>
      </div>
    </ListItem>
  );
};

export default WorkspaceListItem;
