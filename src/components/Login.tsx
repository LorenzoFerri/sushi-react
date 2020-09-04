import {
  Button,
  Divider,
  Heading,
  Stack,
  useTheme,
  Code,
  Text,
  Flex,
  IconButton,
  Box,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { RiAppleFill, RiGoogleFill } from "react-icons/ri";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAdd } from "react-icons/md";
import { BiUser } from "react-icons/bi";

interface Props {}

export const Login = () => {
  const theme = useTheme();
  const [error, setError] = useState<string | undefined>();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple] = useState(false);
  const [user] = useAuthState(firebase.auth());

  function loginWithGoogle() {
    setError(undefined);
    setLoadingGoogle(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((err) => setError(err.message))
      .finally(() => setLoadingGoogle(false));
  }

  if (user) return <Redirect to="/" />;
  return (
    <Stack spacing={3} textAlign="center">
      <Flex
        align="center"
        justify="space-between"
        padding={4}
        paddingBottom={0}
        marginBottom={0}
      >
        <Heading>
          <span role="img" aria-label="Sushi emoji">
            🍣
          </span>{" "}
          Rippesushi
        </Heading>
      </Flex>
      <Divider />
      <Stack p={3}>
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
        {error && (
          <>
            <Text color="tomato" fontWeight="bold">
              Error loggin in try again:
            </Text>
            <br />
            <Code>{error}</Code>
          </>
        )}
      </Stack>
    </Stack>
  );
};
