import "@/styles/globals.css";

import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";

const buttonTheme = createTheme({
  typography: {
    fontFamily: [
      "Rubik",
      "Montserrat",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#1B998B",
    },
    secondary: {
      main: "#60A5FA",
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <RecoilRoot>
      <ThemeProvider theme={buttonTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
