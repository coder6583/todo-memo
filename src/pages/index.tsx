import React from "react";
import Button from "@material-ui/core/Button";
import Head from "next/head";
import { NextPage } from "next";
import IndexLayout from "@/components/layouts/IndexLayout/IndexLayout";
import TaskListView from "@/components/models/TaskListView/TaskListView";

const Home: NextPage = () => {
  const title = "TODO Memo";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <IndexLayout>
        <TaskListView />
      </IndexLayout>
    </>
  );
};

export default Home;
