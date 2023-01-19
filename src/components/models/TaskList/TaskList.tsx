import { TaskListType } from "@/typings/tasklist";
import { Add, MoreVert } from "@material-ui/icons";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import { FC } from "react";
import TaskNode from "../TaskNode/TaskNode";

type TaskListProps = {
  tasklist: TaskListType;
};

const TaskList: FC<TaskListProps> = ({ tasklist }: TaskListProps) => {
  return (
    <Card>
      <CardHeader
        title={tasklist.name}
        action={
          <>
            <IconButton aria-label="add_task" className="p-1">
              <Add className="text-white" />
            </IconButton>
            <IconButton aria-label="settings" className="p-1">
              <MoreVert className="text-white" />
            </IconButton>
          </>
        }
        className="p-4 pt-3 pb-1 text-xl bg-blue-400 text-white"
      />
      <CardContent>
        <Stack spacing={1}>
          {tasklist.tasklist.map((task) => {
            return <TaskNode task={task} key={task.name} />;
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskList;
