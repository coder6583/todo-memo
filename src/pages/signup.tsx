import SignUpLayout from "@/components/layouts/SignUpLayout/SignUpLayout";
import SignUpForm from "@/components/models/SignUp/SignUpForm";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up for Todomemo</title>
      </Head>
      <SignUpLayout>
        <SignUpForm />
      </SignUpLayout>
    </>
  );
};

export default SignUp;
