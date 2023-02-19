import React, { useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import TaskListView from "@/components/models/TaskListView/TaskListView";
import WorkspaceLayout from "@/components/layouts/WorkspaceLayout/WorkspaceLayout";
import { doc, onSnapshot } from "firebase/firestore";
import db, { auth } from "@/features/firebase/firebase";
import { userConverter } from "@/features/firebase/firestore";
import { useRecoilState } from "recoil";
import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import WorkspaceHomeView from "@/components/models/Workspace/WorkspaceHomeView";

const Todo: NextPage = () => {
  const title = "Todomemo";
  const [user, setUser] = useRecoilState(UserState);
  const [workspaceIndex] = useRecoilState(WorkspaceIndexState);
  useEffect(() => {
    if (auth.currentUser) {
      const userDocumentRef = doc(
        db,
        "users",
        auth.currentUser.uid
      ).withConverter(userConverter);
      const unsub = onSnapshot(userDocumentRef, (documentSnapshot) => {
        const data = documentSnapshot.data();
        if (data) {
          setUser(data);
        }
      });
      return unsub;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <WorkspaceLayout>
        {typeof workspaceIndex === "number" ? (
          <TaskListView workspace={user.workspaces.at(workspaceIndex)} />
        ) : (
          <WorkspaceHomeView />
        )}
      </WorkspaceLayout>
    </>
  );
};

export default Todo;
