import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import TaskListView from "@/components/models/TaskListView/TaskListView";
import IndexLayout from "@/components/layouts/IndexLayout/IndexLayout";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  const title = "Todomemo";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <IndexLayout>
        <Typography>Hello</Typography>
      </IndexLayout>
    </>
  );
};

export default Home;
