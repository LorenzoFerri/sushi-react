import { Button, Divider, Heading, Stack, useTheme } from "@chakra-ui/core";
import React, { useState } from "react";
import { RiAppleFill, RiGoogleFill } from "react-icons/ri";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {}

export const Login = (props: Props) => {
  const theme = useTheme();
  const [error, setError] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);
  const [user] = useAuthState(firebase.auth());

  function loginWithGoogle() {
    setError(false);
    setLoadingGoogle(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(() => setError(true))
      .finally(() => setLoadingGoogle(false));
  }

  if (user) return <Redirect to="/" />;
  return (
    <Stack padding={theme.space[10]} spacing={3} textAlign="center">
      <Heading>🍣 Rippesushi</Heading>
      <Divider />
      <Heading size="lg">Login:</Heading>
      {firebase.auth().currentUser?.displayName}
      <Button
        leftIcon={RiGoogleFill}
        variantColor="red"
        onClick={loginWithGoogle}
        isLoading={loadingGoogle}
      >
        Login with Google
      </Button>
      <Button
        leftIcon={RiAppleFill}
        variantColor="gray"
        isLoading={loadingApple}
      >
        Login with Apple
      </Button>
    </Stack>
  );
};
