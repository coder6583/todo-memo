import HorizMenu from "@/components/ui/HorizMenu";
import { MarkdownComponents } from "@/features/markdown/markdown";
import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import updateTask from "@/features/tasklist/updateTask";
import { MemoType, TaskType, UserType } from "@/typings/tasklist";
import { ContentCopy, Delete, DeleteOutline, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRecoilState } from "recoil";
import remarkGfm from "remark-gfm";
import TaskNodeMemoEdit from "./TaskNodeMemoEdit";
import TaskNodeMemoMenu from "./TaskNodeMemoMenu";

type TaskNodeMemoProps = {
  memo: MemoType;
  listIndex: number;
  taskIndex: number;
  task: TaskType;
  memoIndex: number;
};

const TaskNodeMemo: FC<TaskNodeMemoProps> = ({
  memo,
  listIndex,
  taskIndex,
  task,
  memoIndex,
}) => {
  const [userData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  const [edit, setEdit] = useState<boolean>(false);
  return !edit ? (
    <Card className="w-full mb-2 mt-2 flex-1 bg-gray-100" square>
      <CardHeader
        className="p-1 bg-theme2"
        action={
          <div>
            <IconButton
              onClick={() => {
                setEdit(true);
              }}
              className="text-white p-1"
            >
              <Edit />
            </IconButton>
            <IconButton
              className="text-white hover:text-red-600 p-1"
              onClick={() => {
                updateTask(
                  userData.workspaces,
                  workspaceIndex,
                  listIndex,
                  taskIndex,
                  task.state,
                  {
                    ...task,
                    memolist: [
                      ...task.memolist.slice(0, memoIndex),
                      ...task.memolist.slice(memoIndex + 1),
                    ],
                  }
                );
              }}
            >
              <Delete />
            </IconButton>
          </div>
          // <HorizMenu
          //   MenuComponent={TaskNodeMemoMenu}
          //   menuComponentProps={{
          //     listIndex: listIndex,
          //     taskIndex: taskIndex,
          //     taskState: task.state,
          //     memoIndex: memoIndex,
          //     editHandler: () => {
          //       setEdit(true);
          //     },
          //   }}
          //   horizColor="white"
          // />
        }
      />
      <CardContent className="pl-4 pt-2 pb-2">
        {memo.type == "text" ? (
          <>
            {memo.title ? (
              <Typography variant="h6">{memo.title}</Typography>
            ) : (
              <></>
            )}
            <Typography variant="body1">{memo.content}</Typography>
          </>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {memo.content}
          </ReactMarkdown>
        )}
      </CardContent>
    </Card>
  ) : (
    <TaskNodeMemoEdit
      originalMemo={memo}
      memoIndex={memoIndex}
      setMemoEdit={setEdit}
      listIndex={listIndex}
      taskIndex={taskIndex}
      task={task}
    />
  );
};

export default TaskNodeMemo;
