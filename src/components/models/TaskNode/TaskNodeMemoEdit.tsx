import {
  UserState,
  WorkspaceExpandState,
  WorkspaceIndexState,
} from "@/features/recoil/tasklist";
import updateTask from "@/features/tasklist/updateTask";
import { MemoType, TaskType } from "@/typings/tasklist";
import {
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Divider,
  Input,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { FC, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MarkdownComponents } from "@/features/markdown/markdown";
import remarkGfm from "remark-gfm";
import ReactCodeMirror from "@uiw/react-codemirror";
import styles from "./TaskNode.module.css";
import { MarkdownTheme } from "@/features/markdown/editor";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import {
  materialDark,
  materialDarkInit,
  materialLight,
} from "@uiw/codemirror-theme-material";

const TaskNodeMemoEditTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingLeft: "6px",
          marginTop: "4px",
          "&:focus": {
            borderLeft: "2px solid !important",
            borderColor: "#1B998B !important",
          },
        },
      },
    },
  },
});

type TaskNodeMemoEditProps = {
  originalMemo?: MemoType;
  memoIndex?: number;
  task: TaskType;
  taskIndex: number;
  listIndex: number;
  setMemoEdit: (value: SetStateAction<boolean>) => void;
};

const TaskNodeMemoEdit: FC<TaskNodeMemoEditProps> = ({
  originalMemo,
  memoIndex,
  task,
  taskIndex,
  listIndex,
  setMemoEdit,
}) => {
  const [userData, setUserData] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  const [memo, setMemo] = useState<MemoType>(
    originalMemo
      ? originalMemo
      : {
          content: "",
          id: v4(),
          date: Date.now(),
          type: "text",
        }
  );
  const [memoError, setMemoError] = useState<boolean>(false);
  const [inputFormat, setInputFormat] = useState<"text" | "markdown">("text");
  const [workspaceExpand, setWorkspaceExpand] =
    useRecoilState(WorkspaceExpandState);

  useEffect(() => {
    if (originalMemo && originalMemo.type == "markdown") {
      setWorkspaceExpand(true);
      setInputFormat("markdown");
    }
  }, [originalMemo, setWorkspaceExpand]);

  return (
    <Card className="w-full mb-2 mt-2 flex-1 bg-gray-100" square>
      <CardContent className="p-2">
        <ThemeProvider theme={TaskNodeMemoEditTheme}>
          {inputFormat == "text" ? (
            <>
              <Input
                placeholder="Title"
                disableUnderline
                className="w-full text-xl"
                defaultValue={memo.title ?? ""}
                autoFocus
                onChange={(e) => {
                  setMemo({ ...memo, title: e.currentTarget.value });
                }}
              />
              <Input
                placeholder="Memo"
                disableUnderline
                className="w-full mb-1"
                multiline
                minRows={2}
                defaultValue={memo.content}
                onChange={(e) => {
                  if (e.currentTarget.value != "") {
                    setMemoError(false);
                  }
                  setMemo({ ...memo, content: e.currentTarget.value });
                }}
              />
            </>
          ) : (
            <div className="flex" style={{ height: "400px" }}>
              <ReactCodeMirror
                placeholder="Memo"
                className={styles.codeMirror}
                value={memo.content}
                autoFocus
                extensions={[
                  markdown({
                    base: markdownLanguage,
                    codeLanguages: languages,
                  }),
                  materialLight,
                ]}
                height="400px"
                basicSetup={{
                  lineNumbers: false,
                  foldGutter: false,
                  highlightActiveLine: false,
                }}
                onChange={(newValue) => {
                  if (newValue != "") {
                    setMemoError(false);
                  }
                  setMemo({ ...memo, content: newValue });
                }}
              />
              <Divider
                flexItem
                orientation="vertical"
                className="mr-1 ml-1 mb-1"
              />
              <div className={styles.markdownPreview}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={MarkdownComponents}
                >
                  {memo.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </ThemeProvider>
        <Divider className="mb-2" />
        {memoError ? (
          <Typography variant="body2" className="text-red-600 ml-8 text-right">
            *Please enter memo content.
          </Typography>
        ) : (
          <></>
        )}
        <Box className="flex mb-2">
          <ToggleButtonGroup
            className="flex-1"
            value={inputFormat}
            color="primary"
            exclusive
            onChange={(_, val: "text" | "markdown") => {
              setInputFormat(val);
              setMemo({ ...memo, type: val });
              if (val == "markdown") {
                setWorkspaceExpand(true);
              }
            }}
          >
            <ToggleButton value="text" size="small">
              Text
            </ToggleButton>
            <ToggleButton value="markdown" size="small">
              Markdown
            </ToggleButton>
          </ToggleButtonGroup>
          {originalMemo ? (
            <Button
              variant="contained"
              className="bg-theme2 mr-2"
              size="small"
              onClick={() => {
                if (memo.content.length > 0 && memoIndex) {
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
                        memo,
                        ...task.memolist.slice(memoIndex + 1),
                      ],
                    }
                  ).then((newWorkspaces) => {
                    if (newWorkspaces) {
                      setUserData({ ...userData, workspaces: newWorkspaces });
                    }
                    setMemoEdit(false);
                  });
                } else {
                  setMemoError(true);
                }
              }}
            >
              Save Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              className="bg-theme2 mr-2"
              size="small"
              onClick={() => {
                if (memo.content.length > 0) {
                  updateTask(
                    userData.workspaces,
                    workspaceIndex,
                    listIndex,
                    taskIndex,
                    task.state,
                    { ...task, memolist: [...(task.memolist ?? []), memo] }
                  ).then((newWorkspaces) => {
                    if (newWorkspaces) {
                      setUserData({ ...userData, workspaces: newWorkspaces });
                    }
                    setMemoEdit(false);
                  });
                } else {
                  setMemoError(true);
                }
              }}
            >
              Add Memo
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setMemoEdit(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskNodeMemoEdit;
