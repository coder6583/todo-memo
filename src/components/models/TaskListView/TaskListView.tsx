import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import { updateListDrag } from "@/features/tasklist/updateListDrag";
import { Box, Divider, Paper, styled } from "@mui/material";
import { FC } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import AddListButton from "./AddListButton";
import TaskList from "../TaskList/TaskList";
import TaskListViewHeader from "./TaskListViewHeader";
import { TaskListViewType } from "@/typings/tasklist";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type TaskListViewProps = {
  workspace: TaskListViewType | undefined;
};

const TaskListView: FC<TaskListViewProps> = ({ workspace }) => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);

  return (
    <>
      <TaskListViewHeader />
      <Divider className="mb-2" />
      <DragDropContext
        onDragEnd={(result) => {
          updateListDrag(data.workspaces, workspaceIndex, result).then(
            (newWorkspaces) => {
              if (newWorkspaces) {
                setData({ ...data, workspaces: newWorkspaces });
              }
            }
          );
        }}
      >
        <Box
          component="div"
          className="flex overflow-auto w-full pl-4"
          sx={{
            height:
              "calc(100vh - var(--top-bar-height) - var(--listview-header) - 17px)",
            // scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              height: "8px",
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {(workspace?.tasklistlist ?? []).map((tasklist, listIndex) => {
            return (
              <Paper
                elevation={4}
                className="block m-2 mr-4 h-min"
                sx={{ width: "37%", minWidth: "37%", maxWidth: "37%" }}
                key={tasklist.id}
              >
                <TaskList tasklist={tasklist} listIndex={listIndex} />
              </Paper>
            );
          })}
          <AddListButton />
        </Box>
      </DragDropContext>
    </>
  );
};

export default TaskListView;
