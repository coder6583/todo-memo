import "@/styles/globals.css";

import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { createTheme, CssBaseline } from "@mui/material";
import { MuiThemeProvider } from "@material-ui/core";

const buttonTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <MuiThemeProvider theme={buttonTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
};

export default MyApp;
