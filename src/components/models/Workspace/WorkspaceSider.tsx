import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import { Home } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AddWorkspaceButton from "./AddWorkspaceButton";
import WorkspaceListItem from "./WorkspaceListItem";
import styles from "./Workspace.module.css";

const WorkspaceSider = () => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex, setWorkspaceIndex] =
    useRecoilState(WorkspaceIndexState);
  useEffect(() => {
    setWorkspaceIndex(workspaceIndex);
  }, [workspaceIndex, setWorkspaceIndex]);

  return (
    <>
      <Paper className={styles.siderStyle} elevation={2}>
        <List className="pt-2">
          <ListItem
            className="p-0"
            sx={{
              backgroundColor: workspaceIndex === "home" ? "#DDDDDD" : "FFFFFF",
            }}
          >
            <ListItemButton
              onClick={() => {
                setWorkspaceIndex("home");
              }}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List className="pt-2">
          <ListItem>
            <ListItemText primary="Workspaces" />
          </ListItem>
          {data.workspaces.map((workspace, i) => {
            return <WorkspaceListItem workspace={workspace} i={i} key={i} />;
          })}
          <ListItem className="p-0">
            <AddWorkspaceButton />
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

export default WorkspaceSider;
