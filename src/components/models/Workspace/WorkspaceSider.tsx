import { UserState } from "@/features/recoil/tasklist";
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
import { useRecoilState } from "recoil";
import AddWorkspaceButton from "./AddWorkspaceButton";
import WorkspaceListItem from "./WorkspaceListItem";

const WorkspaceSider = () => {
  const [data, setData] = useRecoilState(UserState);

  return (
    <>
      <Paper
        className="w-1/5 bg-gray-100"
        sx={{
          height: "calc(100vh - var(--top-bar-height))",
        }}
        elevation={2}
      >
        <List className="pt-2">
          <ListItem className="p-0">
            <ListItemButton>
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
