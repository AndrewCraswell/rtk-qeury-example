import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import "./index.css";

const useStyles = makeStyles({
  root: { minHeight: "100vh", ...shorthands.overflow("hidden") },
});

export function Root() {
  const classes = useStyles();

  return (
    <FluentProvider theme={webDarkTheme} className={classes.root}>
      <App />
    </FluentProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
