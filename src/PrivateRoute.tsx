import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import firebase from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Spinner } from '@chakra-ui/core';
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ children, ...rest }: any) {
  const [user, loading] = useAuthState(firebase.auth());
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (loading)
          return (
            <Box textAlign='center' p='10'>
              <Spinner></Spinner>
            </Box>
          );
        if (user) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
