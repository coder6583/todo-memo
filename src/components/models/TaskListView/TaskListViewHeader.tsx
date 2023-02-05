import EditableTypography from "@/components/ui/EditableTypography";
import {
  AddListButtonState,
  UserState,
  WorkspaceIndexState,
} from "@/features/recoil/tasklist";
import updateViewName from "@/features/tasklist/updateViewName";
import { PostAdd } from "@mui/icons-material";
import { Box, Button, Divider, Switch, Typography } from "@mui/material";
import { useRecoilState } from "recoil";

const TaskListViewHeader = () => {
  const [data, setData] = useRecoilState(UserState);
  const [edit, setEdit] = useRecoilState(AddListButtonState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);

  return (
    <Box component="div" className="flex pb-4 pt-4 pl-8">
      <EditableTypography
        defaultValue={data.workspaces.at(workspaceIndex)?.name ?? ""}
        onBlur={(e) => {
          const newWorkspaces = updateViewName(
            data.workspaces,
            workspaceIndex,
            e.currentTarget.value
          );
          if (newWorkspaces) {
            setData({ ...data, workspaces: newWorkspaces });
          }
        }}
        underlineColor="black"
        textColor="black"
        typographyVariant="h4"
        inputTextSize="2.0rem"
        inputLineHeight="2.0rem"
      />
      <Divider orientation="vertical" flexItem className="ml-4 mr-4" />
      <Button
        variant="outlined"
        startIcon={<PostAdd />}
        onClick={() => {
          setEdit(true);
        }}
        className="text-theme2 border-theme2"
      >
        Add List
      </Button>
      <Typography variant="body2" className="text-theme3 my-auto ml-auto">
        View All
      </Typography>
      <Switch />
    </Box>
  );
};

export default TaskListViewHeader;
