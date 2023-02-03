import NewItemInput from "@/components/ui/NewItemInput";
import {
  AddListButtonState,
  WorkspaceIndexState,
  WorkspacesState,
} from "@/features/recoil/tasklist";
import updateAddList from "@/features/tasklist/updateAddList";
import { updateAddWorkspace } from "@/features/tasklist/updateAddWorkspace";
import { AddCircle, AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { useRecoilState } from "recoil";

const AddListButton = () => {
  const [data, setData] = useRecoilState(WorkspacesState);
  const [edit, setEdit] = useRecoilState(AddListButtonState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  const addList = (str: string) => {
    const newData = updateAddList(data, workspaceIndex, str);
    if (newData) {
      setData(newData);
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
      <Box
        component="div"
        className="h-min"
        sx={{
          width: "37%",
          maxWidth: "37%",
          minWidth: "37%",
        }}
      >
        <Box component="div" className="w-full mt-2">
          <NewItemInput
            itemName="List"
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
      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        sx={{
          width: "37%",
          maxWidth: "37%",
          minWidth: "37%",
        }}
        className="h-min mt-2 border-theme2 text-theme2 mr-4"
        onClick={() => {
          setEdit(true);
        }}
      >
        Add a New List
      </Button>
    );
  }
};

export default AddListButton;
