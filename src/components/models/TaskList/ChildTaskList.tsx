import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import updateAddTask from "@/features/tasklist/updateAddTask";
import { TaskStateType, TaskType } from "@/typings/tasklist";
import { AddCircleOutline } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import TaskNode from "../TaskNode/TaskNode";

type ChildTaskListType = {
  tasklist: TaskType[];
  id: string;
  listIndex: number;
  state: TaskStateType;
};

const ChildTaskList: FC<ChildTaskListType> = ({
  tasklist,
  id,
  listIndex,
  state,
}) => {
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  return (
    <>
      <Droppable droppableId={id}>
        {(droppableProvided: DroppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            <Stack spacing={1} className="pt-2">
              {tasklist.map((task, taskIndex) => {
                return (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={taskIndex}
                  >
                    {(draggableProvided) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        className="float-right"
                      >
                        <TaskNode
                          task={task}
                          key={task.id}
                          taskIndex={taskIndex}
                          listIndex={listIndex}
                          state={state}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </Stack>
            {droppableProvided.placeholder}
            {state == "todo" &&
            tasklist.reduce(
              (accum, currVal) => accum && currVal.initialized,
              true
            ) ? (
              <Button
                variant="outlined"
                startIcon={<AddCircleOutline />}
                className="h-min ml-4 mt-2 border-theme2 text-theme2"
                sx={{ width: "calc(100% - 16px)" }}
                onClick={() => {
                  updateAddTask(
                    data.workspaces,
                    workspaceIndex,
                    listIndex
                  ).then((newWorkspaces) => {
                    if (newWorkspaces) {
                      setData({ ...data, workspaces: newWorkspaces });
                    }
                  });
                }}
              >
                Add New Task
              </Button>
            ) : (
              <></>
            )}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default ChildTaskList;
