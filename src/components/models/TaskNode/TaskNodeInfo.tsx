import { TaskType } from "@/typings/tasklist";
import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button, Divider, Stack } from "@mui/material";
import { FC, useState } from "react";
import TaskNodeMemo from "./TaskNodeMemo";
import TaskNodeMemoEdit from "./TaskNodeMemoEdit";

type TaskNodeInfoProps = {
  task: TaskType;
  taskIndex: number;
  listIndex: number;
};

const TaskNodeInfo: FC<TaskNodeInfoProps> = ({
  task,
  taskIndex,
  listIndex,
}) => {
  const [memoEdit, setMemoEdit] = useState<boolean>(false);
  return (
    <Box>
      <Divider />
      <Box className="flex w-full">
        <Divider
          orientation="vertical"
          className="ml-2 mr-2 mt-1 mb-1"
          flexItem
        />
        <Box className="mr-2 w-full">
          <Stack spacing={1} className="mr-2 w-full">
            {(task.memolist ?? []).map((memo, memoIndex) => {
              return (
                <TaskNodeMemo
                  memo={memo}
                  key={memo.id}
                  listIndex={listIndex}
                  taskIndex={taskIndex}
                  task={task}
                  memoIndex={memoIndex}
                />
              );
            })}
          </Stack>
          {memoEdit ? (
            <TaskNodeMemoEdit
              taskIndex={taskIndex}
              task={task}
              listIndex={listIndex}
              setMemoEdit={setMemoEdit}
            />
          ) : (
            <Button
              variant="outlined"
              startIcon={<AddCircleOutline />}
              className="w-full mb-2 mt-2 flex-1"
              onClick={() => {
                setMemoEdit(true);
              }}
            >
              Add New Memo
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TaskNodeInfo;
