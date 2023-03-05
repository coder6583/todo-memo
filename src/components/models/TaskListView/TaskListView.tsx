import {
  UserState,
  WorkspaceExpandState,
  WorkspaceIndexState,
} from "@/features/recoil/tasklist";
import { updateListDrag } from "@/features/tasklist/updateListDrag";
import { Box, Divider, Paper, styled, SxProps, Theme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import AddListButton from "./AddListButton";
import TaskList from "../TaskList/TaskList";
import TaskListViewHeader from "./TaskListViewHeader";
import { TaskListViewType } from "@/typings/tasklist";
import TaskListViewContents from "./TaskListViewContents";

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
  const [workspaceExpand] = useRecoilState(WorkspaceExpandState);
  const [taskListIndex, setTaskListIndex] = useState<number | null>(
    workspaceExpand ? 0 : null
  );

  useEffect(() => {
    if (workspaceExpand) {
      if (taskListIndex == null) {
        setTaskListIndex(0);
      }
    } else {
      setTaskListIndex(null);
    }
  }, [workspaceExpand, taskListIndex]);

  return (
    <>
      <TaskListViewHeader setTaskListIndex={setTaskListIndex} />
      <Divider className="mb-0" />
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
          id="tasklistview"
          component="div"
          className="flex overflow-auto w-full pt-2"
          sx={{
            height:
              "calc(100vh - var(--top-bar-height) - var(--listview-header) - 9px)",
            "&::-webkit-scrollbar": {
              height: workspaceExpand ? "0px" : "12px",
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
              border: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#666",
            },
            "&::-webkit-scrollbar-thumb:active": {
              background: "#444",
            },
          }}
        >
          <TaskListViewContents
            workspace={workspace}
            workspaceExpand={workspaceExpand}
            taskListIndex={taskListIndex}
            setTaskListIndex={setTaskListIndex}
          />
        </Box>
      </DragDropContext>
    </>
  );
};

export default TaskListView;
