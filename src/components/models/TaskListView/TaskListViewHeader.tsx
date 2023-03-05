import EditableTypography from "@/components/ui/EditableTypography";
import {
  AddListButtonState,
  UserState,
  WorkspaceExpandState,
  WorkspaceIndexState,
} from "@/features/recoil/tasklist";
import updateViewName from "@/features/tasklist/updateViewName";
import { PostAdd } from "@mui/icons-material";
import { Box, Button, Divider, Switch, Typography } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { useRecoilState } from "recoil";

type TaskListViewHeaderProps = {
  setTaskListIndex: Dispatch<SetStateAction<number | null>>;
};

const TaskListViewHeader: FC<TaskListViewHeaderProps> = ({
  setTaskListIndex,
}) => {
  const [data, setData] = useRecoilState(UserState);
  const [edit, setEdit] = useRecoilState(AddListButtonState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  const [workspaceExpand, setExpand] = useRecoilState(WorkspaceExpandState);

  return (
    <Box component="div" className="flex pb-4 pt-4 pl-8">
      <EditableTypography
        defaultValue={
          typeof workspaceIndex === "number"
            ? data.workspaces.at(workspaceIndex)?.name ?? ""
            : ""
        }
        onBlur={(e) => {
          if (e.currentTarget.value.length > 0) {
            updateViewName(
              data.workspaces,
              workspaceIndex,
              e.currentTarget.value
            ).then((newWorkspaces) => {
              if (newWorkspaces) {
                setData({ ...data, workspaces: newWorkspaces });
              }
            });
          } else {
            return null;
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
          if (workspaceExpand && typeof workspaceIndex === "number") {
            setTaskListIndex(
              (data.workspaces.at(workspaceIndex)?.tasklistlist ?? []).length
            );
          }
          setEdit(true);
        }}
        className="text-theme2 border-theme2"
      >
        Add List
      </Button>
      <Typography variant="body2" className="text-theme3 mt-2 ml-auto">
        Expand
      </Typography>
      <Switch
        checked={workspaceExpand}
        onChange={(_e, checked) => {
          setExpand(checked);
        }}
      />
    </Box>
  );
};

export default TaskListViewHeader;
