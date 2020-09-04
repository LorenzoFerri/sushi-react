import {
  Button,
  Code,
  Container,
  Heading,
  Stack,
  Text,
  Center,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RiAppleFill, RiGoogleFill } from 'react-icons/ri';
import { Redirect } from 'react-router-dom';
import firebase from '../firebase';
import { Nav } from './Nav';

interface Props {}

export const Login = () => {
  // const theme = useTheme();
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

  if (user) return <Redirect to='/' />;
  return (
    <>
      <Nav />
      <Container>
        <Stack>
          <Center>
            <Heading size='lg'>Login:</Heading>
            {firebase.auth().currentUser?.displayName}
          </Center>
          <Button
            leftIcon={<RiGoogleFill />}
            colorScheme='red'
            onClick={loginWithGoogle}
            isLoading={loadingGoogle}
          >
            Login with Google
          </Button>
          <Button
            leftIcon={<RiAppleFill />}
            colorScheme='gray'
            isLoading={loadingApple}
          >
            Login with Apple
          </Button>
          {error && (
            <>
              <Text color='tomato' fontWeight='bold'>
                Error loggin in try again:
              </Text>
              <br />
              <Code>{error}</Code>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
};
