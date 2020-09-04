import { ChakraProvider } from "@chakra-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { RoomPage } from "./components/RoomPage";
import { PrivateRoute } from "./PrivateRoute";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <AppRouter></AppRouter>
    </ChakraProvider>
  );
}

function AppRouter() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/room/:id" children={<RoomPage />} />
      </Switch>
    </Router>
  );
}

export default App;
