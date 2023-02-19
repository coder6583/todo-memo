import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import updateRemoveWorkspace from "@/features/tasklist/updateRemoveWorkspace";
import { MenuComponentProps } from "@/typings/tasklist";
import { DeleteOutline } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC } from "react";
import { useRecoilState } from "recoil";

const WorkspaceMenu: FC<MenuComponentProps> = ({
  handleClose,
  workspaceIndex,
}) => {
  const [userData, setUserData] = useRecoilState(UserState);
  const [selectedWorkspaceIndex, setIndex] =
    useRecoilState(WorkspaceIndexState);
  return (
    <MenuItem
      onClick={() => {
        if (typeof workspaceIndex === "number") {
          updateRemoveWorkspace(userData.workspaces, workspaceIndex)
            .then((newWorkspaces) => {
              if (newWorkspaces) {
                setUserData({ ...userData, workspaces: newWorkspaces });
                if (typeof selectedWorkspaceIndex === "number") {
                  if (workspaceIndex < selectedWorkspaceIndex) {
                    setIndex(selectedWorkspaceIndex - 1);
                  } else if (workspaceIndex == selectedWorkspaceIndex) {
                    if (userData.workspaces.length == 1) {
                      setIndex("home");
                    } else if (
                      workspaceIndex ==
                      userData.workspaces.length - 1
                    ) {
                      setIndex(userData.workspaces.length - 2);
                    }
                  }
                }
              }
              handleClose();
            })
            .catch((err) => {
              console.error(err);
              handleClose();
            });
        } else {
          handleClose();
        }
      }}
      className="text-red-600"
    >
      <ListItemIcon className="text-red-600">
        <DeleteOutline />
      </ListItemIcon>
      <ListItemText>Delete Workspace</ListItemText>
    </MenuItem>
  );
};

export default WorkspaceMenu;
