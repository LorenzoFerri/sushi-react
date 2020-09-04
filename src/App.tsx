import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { PrivateRoute } from "./PrivateRoute";
import theme from "./theme";
import { RoomPage } from "./components/RoomPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Router>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/room/:id" children={<RoomPage />} />
          </Switch>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
