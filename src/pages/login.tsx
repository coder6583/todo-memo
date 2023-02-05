import LoginLayout from "@/components/layouts/LoginLayout/LoginLayout";
import LoginForm from "@/components/models/Login/LoginForm";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up for todomemo</title>
      </Head>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </>
  );
};

export default Login;
