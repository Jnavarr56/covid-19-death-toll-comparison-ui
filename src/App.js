import React from "react";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import MainLayout from "./layout/Main";
import Home from "./views/Home";

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
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <MainLayout>
          <Home />
        </MainLayout>
      </ThemeProvider>
    </>
  );
};

export default App;
