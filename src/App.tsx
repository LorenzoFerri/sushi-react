import { useColorMode } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import { Login } from './components/Login';
import { RoomPage } from './components/RoomPage';
import { PrivateRoute } from './PrivateRoute';
import theme from './theme';

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AppRouter></AppRouter>
    </ChakraProvider>
  );
}

function AppRouter() {
  const { setColorMode } = useColorMode();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  useEffect(() => {
    if (prefersDark) setColorMode('dark');
  }, [prefersDark, setColorMode]);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <Home />
        </PrivateRoute>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/room/:id' children={<RoomPage />} />
      </Switch>
    </Router>
  );
}

export default App;
