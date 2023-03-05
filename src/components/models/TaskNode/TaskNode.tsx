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
import TaskNodeInfo from "./TaskNodeInfo";
import TaskNodeMenu from "./TaskNodeMenu";
import styles from "./TaskNode.module.css";
import { DragIndicator } from "@mui/icons-material";

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
  const [newName, setNewName] = useState<string>(task.name);
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);

  const [edit, setEdit] = useState<boolean>(!task.initialized);
  const stopPropagation: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  const [info, setInfo] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [originalTask, setTask] = useState<TaskType | null>(
    task.initialized ? task : null
  );

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setTask(task.initialized ? task : null);
  }, [task]);

  return (
    <div className={styles.taskNode}>
      <Paper
        elevation={0}
        className={
          "bg-gray-100 border-2 shadow-lg hover:shadow-gray-400 ml-4 hover:ml-2"
        }
        square={false}
        sx={{ borderColor: stateColor(task.state) }}
      >
        <Box
          component="div"
          className="flex align-middle cursor-pointer"
          onDoubleClick={() => {
            if (!info) {
              setError(false);
              setEdit(!edit);
            }
          }}
          onClick={() => {
            setInfo(!info);
          }}
        >
          <DragIndicator
            className={styles.dragIndicator}
            height="6px"
            width="6px"
          />
          <IconButton
            className="mb-auto"
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
          <Box component="div" className="mt-1 mb-1" width={"70%"}>
            {/* TODO: escape textfield when pressed enter */}
            {edit ? (
              <TextField
                defaultValue={task.name}
                autoFocus
                variant="standard"
                placeholder="Task Name"
                onClick={stopPropagation}
                onDoubleClick={stopPropagation}
                onChange={(e) => {
                  setError(e.currentTarget.value == "");
                  setNewName(e.currentTarget.value);
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
              <>
                <Typography
                  variant="body1"
                  className="hover:cursor-pointer mt-1"
                >
                  {task.name}
                </Typography>
                <p
                  className={styles.seeMemos}
                  style={{ display: menuOpen ? "block" : "" }}
                >
                  {edit || info
                    ? "∧ Click to Close Memos"
                    : "v Click to See Memos"}
                </p>
              </>
            )}
          </Box>
          <Box
            component="div"
            className="inline-block align-middle mt-1 mb-auto ml-auto"
            onClick={stopPropagation}
            onDoubleClick={stopPropagation}
          >
            <div
              className={styles.horizMenu}
              style={{ display: menuOpen ? "block" : "" }}
            >
              <HorizMenu
                MenuComponent={TaskNodeMenu}
                menuComponentProps={{
                  listIndex: listIndex,
                  taskIndex: taskIndex,
                  taskState: state,
                }}
                setMenuOpen={setMenuOpen}
              />
            </div>
          </Box>
        </Box>
        {edit && error ? (
          <Typography variant="body2" className="text-red-600 ml-8">
            *Please enter task name.
          </Typography>
        ) : (
          <></>
        )}
        <Collapse in={edit || info} unmountOnExit className="cursor-default">
          {edit ? (
            <TaskNodeEdit
              closeAddTask={() => {
                if (newName != "") {
                  setError(false);
                  setEdit(false);
                } else {
                  setError(true);
                }
              }}
              closeCancel={() => {
                setError(false);
                setEdit(false);
              }}
              originalTask={originalTask}
              task={task}
              listIndex={listIndex}
              taskIndex={taskIndex}
            />
          ) : (
            <TaskNodeInfo
              task={task}
              taskIndex={taskIndex}
              listIndex={listIndex}
            />
          )}
        </Collapse>
      </Paper>
    </div>
  );
};

export default TaskNode;
