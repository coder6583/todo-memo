import {
  WorkspaceIndexState,
  WorkspacesState,
} from "@/features/recoil/tasklist";
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
  const [data, setData] = useRecoilState(WorkspacesState);
  const [workspaceIndex, setIndex] = useRecoilState(WorkspaceIndexState);

  return (
    <Box component="div" className="flex mb-2">
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          if (!originalTask) {
            const newData = updateTask(
              data,
              workspaceIndex,
              listIndex,
              taskIndex,
              "todo",
              { ...task, initialized: true }
            );
            if (newData) {
              setData(newData);
            }
          }
          close();
        }}
        onKeyDown={() => {
          if (!originalTask) {
            const newData = updateTask(
              data,
              workspaceIndex,
              listIndex,
              taskIndex,
              "todo",
              { ...task, initialized: true }
            );
            if (newData) {
              setData(newData);
            }
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
            const newData = updateRemoveTask(
              data,
              workspaceIndex,
              listIndex,
              taskIndex,
              "todo"
            );
            if (newData) {
              setData(newData);
            }
            return null;
          }
          const newData = updateTask(
            data,
            workspaceIndex,
            listIndex,
            taskIndex,
            originalTask.state,
            originalTask
          );
          if (newData) {
            setData(newData);
          }
          close();
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
