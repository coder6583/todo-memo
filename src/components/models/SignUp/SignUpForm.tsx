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
} from "firebase/auth";
import { useRouter } from "next/router";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import GoogleButton from "react-google-button";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const SignUpForm = () => {
  const router = useRouter();
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

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser) {
        router.push("/todo");
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        const usersCollectionRef = doc(db, "users", userCredential.user.uid);
        const documentRef = await setDoc(usersCollectionRef, {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          avatar: "",
          workspaces: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .catch((err) => alert(err.message))
      .then((user) => {
        if (user) {
          const userDocumentRef = doc(db, "users", user.user.uid);
          const documentRef = setDoc(userDocumentRef, {
            name: user.user.displayName,
            email: user.user.email,
            uid: user.user.uid,
            avatar: user.user.photoURL,
            workspaces: [],
          });
        }
      })
      .then(() => {
        router.push("/todo");
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
