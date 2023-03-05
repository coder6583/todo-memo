import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import updateRemoveTask from "@/features/tasklist/updateRemoveTask";
import updateTask from "@/features/tasklist/updateTask";
import { TaskType } from "@/typings/tasklist";
import { Box, Button, Divider, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type TaskNodeEditProps = {
  closeAddTask: () => void;
  closeCancel: () => void;
  originalTask: TaskType | null;
  task: TaskType;
  listIndex: number;
  taskIndex: number;
};

const TaskNodeEdit: FC<TaskNodeEditProps> = ({
  closeAddTask,
  closeCancel,
  originalTask,
  task,
  listIndex,
  taskIndex,
}) => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  useEffect(() => {
    if (task.duedate) {
      setDueDate(new Date(task.duedate));
    }
  }, [task]);

  return (
    <Box>
      <Divider />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Due Date"
          inputFormat="MM/DD/YYYY"
          value={dueDate}
          onChange={(date) => {
            if (date) {
              updateTask(
                data.workspaces,
                workspaceIndex,
                listIndex,
                taskIndex,
                task.state,
                { ...task, duedate: new Date(date).getTime() }
              ).then((newWorkspaces) => {
                if (newWorkspaces) {
                  setData({ ...data, workspaces: newWorkspaces });
                }
                setDueDate(date);
              });
            }
          }}
          renderInput={(params) => <TextField variant="standard" {...params} />}
          className="ml-10 mb-2 mt-1"
        />
      </LocalizationProvider>
      <Box component="div" className="flex mb-2">
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            if (!originalTask) {
              if (task.name != "") {
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
            }
            closeAddTask();
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
                closeCancel();
              });
            }
          }}
          className="w-auto mr-1"
          size="small"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TaskNodeEdit;
