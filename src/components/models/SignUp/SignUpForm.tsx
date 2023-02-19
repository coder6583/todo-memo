import PasswordInput from "@/components/ui/PasswordInput";
import db, { auth, provider } from "@/features/firebase/firebase";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import GoogleButton from "react-google-button";
import { doc, setDoc } from "firebase/firestore";
import { UserState, WorkspaceIndexState } from "@/features/recoil/tasklist";
import { useRecoilState } from "recoil";
import { UserType } from "@/typings/tasklist";

const SignUpForm = () => {
  const router = useRouter();
  const [workspaceIndex, setWorkspaceIndex] =
    useRecoilState(WorkspaceIndexState);
  const [data, setData] = useRecoilState(UserState);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignUp = async (userCredential: UserCredential) => {
    const usersCollectionRef = doc(db, "users", userCredential.user.uid);
    const newUser: UserType = {
      name: name,
      email: email,
      uid: userCredential.user.uid,
      avatar: "",
      workspaces: [],
    };
    const documentRef = await setDoc(usersCollectionRef, newUser);
    setWorkspaceIndex("home");
    setData(newUser);
    router.push("/todo");
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        await handleSignUp(userCredential);
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
          handleSignUp(user);
        }
      });
  };
  return (
    <Paper
      elevation={2}
      className="w-2/5 content-center justify-center mx-auto mt-8 text-center border-2 border-theme2 p-4"
    >
      <Typography variant="h4" className="font-light text-black mt-6 mb-8">
        Sign Up
      </Typography>
      <GoogleButton
        type="light"
        label="Continue with Google"
        className="text-black mx-auto hover:shadow-theme2 mb-4"
        onClick={signIn}
      />
      <Divider>OR</Divider>
      <Stack component="form" noValidate onSubmit={onSubmit}>
        <TextField
          type="text"
          label="Username"
          id="name"
          required
          className="w-5/6 mx-auto mb-4"
          variant="standard"
          onChange={onChange}
        />
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
          Sign Up
        </Button>
      </Stack>
    </Paper>
  );
};

export default SignUpForm;
