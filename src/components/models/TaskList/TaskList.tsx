import EditableTypography from "@/components/ui/EditableTypography";
import HorizMenu from "@/components/ui/HorizMenu";
import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import updateAddTask from "@/features/tasklist/updateAddTask";
import updateListName from "@/features/tasklist/updateListName";
import { TaskListType, TaskStateType } from "@/typings/tasklist";
import { AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useRecoilState } from "recoil";
import ChildTaskList from "./ChildTaskList";
import TaskListMenu from "./TaskListMenu";

type TaskListProps = {
  tasklist: TaskListType;
  listIndex: number;
};

const TaskList: FC<TaskListProps> = ({
  tasklist,
  listIndex,
}: TaskListProps) => {
  //Add Task States and Handlers
  const [data, setData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  const handleAddTask: MouseEventHandler<HTMLButtonElement> = () => {
    updateAddTask(data.workspaces, workspaceIndex, listIndex).then(
      (newWorkspaces) => {
        if (newWorkspaces) {
          setData({ ...data, workspaces: newWorkspaces });
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader
        title={
          <EditableTypography
            defaultValue={tasklist.name}
            onBlur={(e) => {
              updateListName(
                data.workspaces,
                workspaceIndex,
                listIndex,
                e.currentTarget.value
              ).then((newWorkspaces) => {
                if (newWorkspaces) {
                  setData({ ...data, workspaces: newWorkspaces });
                }
              });
            }}
          />
        }
        action={
          <Box component="div" className="align-middle my-auto flex">
            <IconButton
              aria-label="add_task"
              className="p-1 my-auto"
              onClick={handleAddTask}
            >
              <AddCircleOutline className="text-white" />
            </IconButton>
            <Box component="div" className="my-auto">
              <HorizMenu
                MenuComponent={TaskListMenu}
                menuComponentProps={{
                  listIndex: listIndex,
                }}
                horizColor="white"
              />
            </Box>
          </Box>
        }
        sx={{ backgroundColor: tasklist.tagColor }}
        className="pl-4 pt-2 pb-1 pr-1 font-extrabold text-xl text-white shadow-sm align-middle"
      />
      <CardContent>
        {[
          { id: "todo" as TaskStateType, name: "To do" },
          { id: "ondeck" as TaskStateType, name: "On Deck" },
          { id: "done" as TaskStateType, name: "Done" },
        ].map((element, idIndex) => {
          return (
            <Box component="div" key={element.id}>
              <Typography variant="h6" className={idIndex ? "pt-2" : ""}>
                {element.name}
              </Typography>
              <Divider />
              <ChildTaskList
                id={tasklist.id + element.id}
                listIndex={listIndex}
                tasklist={tasklist.tasklist[element.id]}
                state={element.id}
              />
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TaskList;
