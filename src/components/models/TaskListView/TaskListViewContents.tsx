import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import { TaskListType, TaskListViewType } from "@/typings/tasklist";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Divider, IconButton, Paper, SxProps, Theme } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import TaskList from "../TaskList/TaskList";
import AddListButton from "./AddListButton";
import styles from "./TaskListView.module.css";

export const TaskListWidth = (workspaceExpand: boolean) => {
  return workspaceExpand
    ? {
        width: "80vw",
        minWidth: "80vw",
        maxWidth: "80vw",
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "calc((80vw - (77vw - 64px - 2rem))/2)",
        paddingRight: "calc((80vw - (77vw - 64px - 2rem))/2)",
      }
    : {
        width: "40%",
        minWidth: "40%",
        maxWidth: "40%",
        marginTop: "8px",
        marginBottom: "60px",
        marginLeft: "16px",
        marginRight: "16px",
      };
};

type TaskListViewContentsProps = {
  workspace?: TaskListViewType;
  workspaceExpand: boolean;
  taskListIndex: number | null;
  setTaskListIndex: Dispatch<SetStateAction<number | null>>;
};

type SlidingButtonProps = {
  taskListIndex: number;
  taskListList: TaskListType[];
  setTaskListIndex: Dispatch<SetStateAction<number | null>>;
  position: "right" | "left";
  show: boolean;
};

const SlidingButton: FC<SlidingButtonProps> = ({
  taskListIndex,
  taskListList,
  setTaskListIndex,
  position,
  show,
}) => {
  if (position == "left") {
    return (
      <div
        className={styles.viewLeftSlideButton}
        style={{
          display: show ? "block" : "none",
          visibility: taskListIndex > 0 ? "visible" : "hidden",
        }}
        onClick={() => {
          const expandedViewWidth =
            document.getElementById("tasklistview")?.scrollWidth;
          if (expandedViewWidth) {
            const taskListBoardWidth =
              expandedViewWidth / (taskListList.length + 1);
            if (taskListIndex > 0) {
              document.getElementById("tasklistview")?.scrollTo({
                top: 0,
                left: taskListBoardWidth * (taskListIndex - 1),
                behavior: "smooth",
              });
              setTaskListIndex(taskListIndex - 1);
            }
          }
        }}
      >
        <ChevronLeft />
      </div>
    );
  } else {
    return (
      <div
        className={styles.viewRightSlideButton}
        style={{
          display: show ? "block" : "none",
          visibility:
            taskListIndex < taskListList.length ? "visible" : "hidden",
        }}
        onClick={() => {
          const expandedViewWidth =
            document.getElementById("tasklistview")?.scrollWidth;
          if (expandedViewWidth) {
            const taskListBoardWidth =
              expandedViewWidth / (taskListList.length + 1);
            if (taskListIndex < taskListList.length) {
              document.getElementById("tasklistview")?.scrollTo({
                top: 0,
                left: taskListBoardWidth * (taskListIndex + 1),
                behavior: "smooth",
              });
              setTaskListIndex(taskListIndex + 1);
            }
          }
        }}
      >
        <ChevronRight />
      </div>
    );
  }
};

const TaskListViewContents: FC<TaskListViewContentsProps> = ({
  workspace,
  workspaceExpand,
  taskListIndex,
  setTaskListIndex,
}) => {
  return (
    <div className={workspaceExpand ? "flex w-full" : "flex-row w-full"}>
      <SlidingButton
        taskListIndex={taskListIndex ?? 0}
        taskListList={workspace?.tasklistlist ?? []}
        setTaskListIndex={setTaskListIndex}
        position="left"
        show={workspaceExpand}
      />
      <div className={styles.expandedView} id="expandedView">
        {(workspace?.tasklistlist ?? []).map((tasklist, listIndex) => {
          return (
            <div
              className="block h-min"
              key={tasklist.id}
              id={tasklist.id}
              style={TaskListWidth(workspaceExpand)}
            >
              <Paper elevation={4}>
                <TaskList tasklist={tasklist} listIndex={listIndex} />
              </Paper>
            </div>
          );
        })}
        <div style={TaskListWidth(workspaceExpand)} id="addlist">
          <AddListButton style={{ width: "100%" }} />
        </div>
      </div>
      <SlidingButton
        taskListIndex={taskListIndex ?? 0}
        taskListList={workspace?.tasklistlist ?? []}
        setTaskListIndex={setTaskListIndex}
        position="right"
        show={workspaceExpand}
      />
    </div>
  );
};

export default TaskListViewContents;
