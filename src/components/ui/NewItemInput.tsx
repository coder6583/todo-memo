import { Box, Button, Paper, TextField } from "@mui/material";
import { FC, MouseEventHandler, ReactNode, useState } from "react";

type NewItemInputProps = {
  itemName: string;
  onAdd: (str: string) => MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  addList: (str: string) => void;
  inputError: ReactNode;
};

const NewItemInput: FC<NewItemInputProps> = ({
  itemName,
  onAdd,
  onCancel,
  addList,
  inputError,
}) => {
  const [newName, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  return (
    <Paper
      className="mx-auto ml-2 mr-2 border-theme2 p-2 pt-1"
      sx={{ borderWidth: "1px" }}
    >
      <TextField
        label={`New ${itemName}`}
        variant="standard"
        onChange={(e) => {
          setError(e.currentTarget.value == "");
          setName(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addList(newName);
          }
        }}
        className="mb-2 w-full"
        autoFocus
      />
      {error ? inputError : <></>}
      <Box
        component="div"
        className="flex mx-auto content-center justify-center"
      >
        <Button
          variant="contained"
          onClick={onAdd(newName)}
          className="mr-2 bg-theme2 text-white w-auto"
        >
          Add {itemName}
        </Button>
        <Button variant="outlined" onClick={onCancel} className="w-auto">
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default NewItemInput;
