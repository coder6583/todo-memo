import { TaskType } from "@/typings/tasklist";
import { Checkbox, Paper, Typography } from "@mui/material";
import { FC } from "react";

type TaskNodeProps = {
  task: TaskType;
};

const TaskNode: FC<TaskNodeProps> = ({ task }: TaskNodeProps) => {
  return (
    <Paper className="flex align-middle bg-gray-100">
      <Checkbox color="success" defaultChecked={task.checked} />
      <Typography
        variant="body1"
        className="inline-block align-text-bottom my-auto"
      >
        {task.name}
      </Typography>
    </Paper>
  );
};

export default TaskNode;
