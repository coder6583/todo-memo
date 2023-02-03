import { WorkspacesState } from "@/features/recoil/tasklist";
import { Home } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRecoilState } from "recoil";
import AddWorkspaceButton from "../AddWorkspaceButton/AddWorkspaceButton";
import WorkspaceListItem from "../WorkspaceListItem/WorkspaceListItem";

const IndexSider = () => {
  const [data, setData] = useRecoilState(WorkspacesState);

  return (
    <>
      <Box
        component="div"
        className="w-1/5 shadow-md"
        sx={{
          height: "calc(100vh - var(--top-bar-height))",
        }}
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
          {data.map((workspace, i) => {
            return <WorkspaceListItem workspace={workspace} i={i} key={i} />;
          })}
          <ListItem className="p-0">
            <AddWorkspaceButton />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default IndexSider;
