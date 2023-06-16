import {
  Tab,
  TabList,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { useState } from "react";
import { AxiosTodos } from "$pages/AxiosTodos";
import { About } from "$pages/About";
import { QueryTodos } from "$pages/QueryTodos";

const _defaultTab = "axiosTodos";

const useStyles = makeStyles({
  container: { ...shorthands.margin("1rem") },
});

export function App() {
  const [selectedTab, setSelectedTab] = useState(_defaultTab);
  const classes = useStyles();

  return (
    <>
      <TabList
        onTabSelect={(event, tab) => setSelectedTab(tab.value as string)}
        selectedValue={selectedTab}
      >
        <Tab value="axiosTodos">Axios Todos</Tab>
        <Tab value="queryTodos">Query Todos</Tab>
        <Tab value="about">About</Tab>
      </TabList>

      <div className={classes.container}>
        {selectedTab === "axiosTodos" && <AxiosTodos />}
        {selectedTab === "queryTodos" && <QueryTodos />}
        {selectedTab === "about" && <About />}
      </div>
    </>
  );
}
