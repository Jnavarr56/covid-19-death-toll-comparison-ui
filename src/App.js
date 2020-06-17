import React from "react";

import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import MainLayout from "./layout/Main";
import Home from "./views/Home";
import About from "./views/About";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000000",
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Switch>
            <Route exact={true} path="/home/:tab?" component={Home} />
            <Route exact={true} path="/about" component={About} />
            {/* <Route exact={true} path="/tech-staack" component={Home} /> */}
            <Redirect to={"/home"} />
          </Switch>
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
