import {
  WorkspaceIndexState,
  WorkspacesState,
} from "@/features/recoil/tasklist";
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
  const [data, setData] = useRecoilState(WorkspacesState);
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
                className="h-min mt-2 border-theme2 text-theme2 mr-4"
                onClick={() => {
                  const newData = updateAddTask(
                    data,
                    workspaceIndex,
                    listIndex
                  );
                  if (newData) {
                    setData(newData);
                  }
                }}
                fullWidth
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
