import NewItemInput from "@/components/ui/NewItemInput";
import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import { updateAddWorkspace } from "@/features/tasklist/updateAddWorkspace";
import { AddCircle } from "@mui/icons-material";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { useRecoilState } from "recoil";

const AddWorkspaceButton = () => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex, setWorkspaceIndex] =
    useRecoilState(WorkspaceIndexState);
  const [edit, setEdit] = useState<boolean>(false);
  const addList = (str: string) => {
    updateAddWorkspace(data.workspaces, str)
      .then((newWorkspaces) => {
        if (newWorkspaces) {
          setData({ ...data, workspaces: newWorkspaces });
          setWorkspaceIndex(newWorkspaces.length - 1);
        } else {
          // TODO: error
        }
        setEdit(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleOnAdd: (str: string) => MouseEventHandler<HTMLButtonElement> =
    (str: string) => () => {
      addList(str);
    };
  const handleOnCancel = () => {
    setEdit(false);
  };
  if (edit) {
    return (
      <Box component="div" className="h-min">
        <Box component="div" className="w-full mt-2">
          <NewItemInput
            itemName="Workspace"
            onAdd={handleOnAdd}
            onCancel={handleOnCancel}
            addList={addList}
            inputError={
              <Typography className="text-red-600">
                *Please enter a name
              </Typography>
            }
          />
        </Box>
      </Box>
    );
  } else {
    return (
      <ListItemButton
        onClick={() => {
          setEdit(true);
        }}
      >
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>
        <ListItemText primary="Add New Workspace" />
      </ListItemButton>
    );
  }
};

export default AddWorkspaceButton;
