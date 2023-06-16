import React from "react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { todosApi } from "$pages/QueryTodos/todosApi";

import "./index.css";

const useStyles = makeStyles({
  root: { minHeight: "100vh", ...shorthands.overflow("hidden") },
});

export function Root() {
  const classes = useStyles();

  return (
    <ApiProvider api={todosApi}>
      <FluentProvider theme={webDarkTheme} className={classes.root}>
        <App />
      </FluentProvider>
    </ApiProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
