import NewItemInput from "@/components/ui/NewItemInput";
import {
  AddListButtonState,
  UserState,
  WorkspaceExpandState,
  WorkspaceIndexState,
} from "@/features/recoil/tasklist";
import updateAddList from "@/features/tasklist/updateAddList";
import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { CSSProperties, FC, MouseEventHandler, useState } from "react";
import { useRecoilState } from "recoil";
import { TaskListWidth } from "./TaskListViewContents";

type AddListButtonProps = {
  style: CSSProperties;
};

const AddListButton: FC<AddListButtonProps> = ({ style }) => {
  const [data, setData] = useRecoilState(UserState);
  const [edit, setEdit] = useRecoilState(AddListButtonState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  const [workspaceExpand] = useRecoilState(WorkspaceExpandState);

  const addList = (str: string) => {
    if (str != "") {
      updateAddList(data.workspaces, workspaceIndex, str)
        .then((newWorkspaces) => {
          if (newWorkspaces) {
            setData({ ...data, workspaces: newWorkspaces });
          }
          setEdit(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
      <Box component="div" className="h-min" style={style}>
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
        style={style}
        className="h-min border-theme2 text-theme2"
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
