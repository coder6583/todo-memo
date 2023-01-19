import { TaskListViewType } from "@/typings/tasklist";
import { MuiThemeProvider } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  Box,
  Button,
  createTheme,
  Grid,
  Paper,
  styled,
  Switch,
  Typography,
} from "@mui/material";
import { FC } from "react";
import TaskList from "../TaskList/TaskList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const TaskListView: FC = () => {
  const data: TaskListViewType = {
    tasklistlist: [
      {
        name: "Laze プロジェクト",
        tasklist: [
          { name: "testtask1", date: 0, checked: false, memolist: [] },
          { name: "testtask1", date: 0, checked: false, memolist: [] },
        ],
      },
    ],
  };
  return (
    <>
      <Box component="div" className="flex pb-4">
        <Button
          variant="contained"
          startIcon={<Add />}
          className="bg-lime-200 text-gray-500"
        >
          Add List
        </Button>
        <Typography variant="body2" className="text-gray-500 my-auto ml-auto">
          View All
        </Typography>
        <Switch />
      </Box>
      <Grid container spacing={3}>
        {data.tasklistlist.map((tasklist) => {
          return (
            <Grid item xs={4} key={tasklist.name}>
              <TaskList tasklist={tasklist} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TaskListView;
