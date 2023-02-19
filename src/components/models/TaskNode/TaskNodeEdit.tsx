import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import updateRemoveTask from "@/features/tasklist/updateRemoveTask";
import updateTask from "@/features/tasklist/updateTask";
import { TaskType } from "@/typings/tasklist";
import { Box, Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type TaskNodeEditProps = {
  close: () => void;
  originalTask: TaskType | null;
  task: TaskType;
  listIndex: number;
  taskIndex: number;
};

const TaskNodeEdit: FC<TaskNodeEditProps> = ({
  close,
  originalTask,
  task,
  listIndex,
  taskIndex,
}) => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);

  return (
    <Box component="div" className="flex mb-2">
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          if (!originalTask) {
            updateTask(
              data.workspaces,
              workspaceIndex,
              listIndex,
              taskIndex,
              "todo",
              { ...task, initialized: true }
            ).then((newWorkspaces) => {
              if (newWorkspaces) {
                setData({ ...data, workspaces: newWorkspaces });
              }
            });
          }
          close();
        }}
        className="mr-1 bg-theme2 text-white w-auto ml-auto"
      >
        {originalTask == null ? "Add Task" : "Save Edit"}
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          if (!originalTask) {
            updateRemoveTask(
              data.workspaces,
              workspaceIndex,
              listIndex,
              taskIndex,
              "todo"
            )
              .then((newWorkspaces) => {
                if (newWorkspaces) {
                  setData({ ...data, workspaces: newWorkspaces });
                }
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            updateTask(
              data.workspaces,
              workspaceIndex,
              listIndex,
              taskIndex,
              originalTask.state,
              originalTask
            ).then((newWorkspaces) => {
              if (newWorkspaces) {
                setData({ ...data, workspaces: newWorkspaces });
              }
              close();
            });
          }
        }}
        className="w-auto mr-1"
        size="small"
      >
        Cancel
      </Button>
    </Box>
  );
};

export default TaskNodeEdit;
