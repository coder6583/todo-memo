import HorizMenu from "@/components/ui/HorizMenu";
import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import { updateListCheck } from "@/features/tasklist/updateListCheck";
import updateTask from "@/features/tasklist/updateTask";
import { stateColor, stateIcon } from "@/features/tasklist/utils";
import { TaskStateType, TaskType } from "@/typings/tasklist";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import TaskNodeEdit from "./TaskNodeEdit";
import TaskNodeMenu from "./TaskNodeMenu";

type TaskNodeProps = {
  task: TaskType;
  taskIndex: number;
  listIndex: number;
  state: TaskStateType;
};

const TaskNode: FC<TaskNodeProps> = ({
  task,
  taskIndex,
  listIndex,
  state,
}: TaskNodeProps) => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);

  const [edit, setEdit] = useState<boolean>(!task.initialized);
  const stopPropagation: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  const [error, setError] = useState<boolean>(false);
  const [originalTask, setTask] = useState<TaskType | null>(
    task.initialized ? task : null
  );

  useEffect(() => {
    setTask(task.initialized ? task : null);
  }, [task]);

  return (
    <Paper
      elevation={0}
      className={"bg-gray-100 border-2 shadow-lg hover:shadow-gray-400"}
      square={false}
      sx={{ borderColor: stateColor(task.state) }}
    >
      <Box
        component="div"
        className="flex align-middle"
        onDoubleClick={() => {
          setError(false);
          setEdit(!edit);
        }}
      >
        <IconButton
          onClick={() => {
            updateListCheck(
              data.workspaces,
              workspaceIndex,
              listIndex,
              taskIndex,
              state
            ).then((newWorkspaces) => {
              if (newWorkspaces) {
                setData({ ...data, workspaces: newWorkspaces });
              }
            });
          }}
        >
          {stateIcon(task.state)}
        </IconButton>
        <Box component="div" className="my-auto" width={"70%"}>
          {/* TODO: escape textfield when pressed enter */}
          {edit ? (
            <TextField
              defaultValue={task.name}
              autoFocus
              variant="standard"
              onClick={stopPropagation}
              onDoubleClick={stopPropagation}
              onChange={(e) => {
                setError(e.currentTarget.value == "");
                updateTask(
                  data.workspaces,
                  workspaceIndex,
                  listIndex,
                  taskIndex,
                  task.state,
                  { ...task, name: e.currentTarget.value }
                ).then((newWorkspaces) => {
                  if (newWorkspaces) {
                    setData({ ...data, workspaces: newWorkspaces });
                  }
                });
              }}
              multiline
              fullWidth
              className="mb-1"
            />
          ) : (
            <Typography
              variant="body1"
              className="hover:cursor-pointer mt-1 mb-1"
            >
              {task.name}
            </Typography>
          )}
        </Box>
        <Box
          component="div"
          className="inline-block align-middle my-auto ml-auto"
          onClick={stopPropagation}
          onDoubleClick={stopPropagation}
        >
          <HorizMenu
            MenuComponent={TaskNodeMenu}
            menuComponentProps={{
              listIndex: listIndex,
              taskIndex: taskIndex,
              taskState: state,
            }}
          />
        </Box>
      </Box>
      {edit && error ? (
        <Typography variant="body2" className="text-red-600 ml-8">
          *Please enter task name.
        </Typography>
      ) : (
        <></>
      )}
      <Collapse in={edit} unmountOnExit>
        <TaskNodeEdit
          close={() => {
            setError(false);
            setEdit(false);
          }}
          originalTask={originalTask}
          task={task}
          listIndex={listIndex}
          taskIndex={taskIndex}
        />
      </Collapse>
    </Paper>
  );
};

export default TaskNode;
