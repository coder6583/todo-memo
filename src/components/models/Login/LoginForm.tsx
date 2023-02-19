import { ChangeEventHandler, FormEventHandler, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import db, { auth, provider } from "@/features/firebase/firebase";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PasswordInput from "@/components/ui/PasswordInput";
import { useRouter } from "next/router";
import GoogleButton from "react-google-button";
import { useRecoilState } from "recoil";
import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = () => {
  const router = useRouter();
  const [workspaceIndex, setWorkspaceIndex] =
    useRecoilState(WorkspaceIndexState);
  const [userData, setUserData] = useRecoilState(UserState);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = () => {
    setWorkspaceIndex("home");
    router.push("/todo");
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        handleLogin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .catch((err) => alert(err.message))
      .then((user) => {
        if (user) {
          handleLogin();
        }
      });
  };

  return (
    <Paper
      elevation={2}
      className="w-2/5 content-center justify-center mx-auto mt-8 text-center border-2 border-theme2 p-4"
    >
      <Typography variant="h4" className="font-light text-black mt-6 mb-8">
        Log in
      </Typography>
      <Stack component="form" noValidate onSubmit={onSubmit}>
        <GoogleButton
          type="light"
          label="Continue with Google"
          className="text-black mx-auto hover:shadow-theme2 mb-4"
          onClick={signIn}
        />
        <Divider>OR</Divider>
        <TextField
          type="text"
          label="Email Address"
          id="email"
          required
          className="w-5/6 mx-auto mb-4"
          variant="standard"
          onChange={onChange}
        />
        <PasswordInput onChange={onChange} />
        <Button
          variant="contained"
          type="submit"
          className="bg-theme2 w-1/3 mx-auto mb-8"
        >
          Log in
        </Button>
      </Stack>
    </Paper>
  );
};
export default LoginForm;
