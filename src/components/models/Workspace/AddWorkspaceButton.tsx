import NewItemInput from "@/components/ui/NewItemInput";
import { UserState } from "@/features/recoil/tasklist";
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
  const [edit, setEdit] = useState<boolean>(false);
  const addList = (str: string) => {
    const newWorkspaces = updateAddWorkspace(data.workspaces, str);
    if (newWorkspaces) {
      setData({ ...data, workspaces: newWorkspaces });
    }
    setEdit(false);
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
