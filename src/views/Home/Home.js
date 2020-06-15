import React, { useState } from "react";
import BarChart from "./components/BarChart";
import { makeStyles, Divider, Tab, Tabs } from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  tabs: {
    alignSelf: "flex-start",
  },
  divider: {
    width: "100%",
  },
  content: {
    flexGrow: 1,
  },
  tabLabel: {
    display: "flex",
    "& *:first-child": {
      marginLeft: 6,
    },
  },
}));

const Home = () => {
  const [tab, setTab] = useState("chart");
  const classes = useStyles();

  const handleChange = (ev, newValue) => setTab(newValue);

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={tab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab
          label={
            <span className={classes.tabLabel}>
              Chart
              <InsertChartIcon />
            </span>
          }
          value={"chart"}
        />
        <Tab
          label={
            <span className={classes.tabLabel}>
              NYT Dataset
              <DescriptionIcon />
            </span>
          }
          value={"nyt-dataset"}
        />
        <Tab
          label={
            <span className={classes.tabLabel}>
              CDC Dataset
              <DescriptionIcon />
            </span>
          }
          value={"cdc-dataset"}
        />
      </Tabs>
      <Divider className={classes.divider} variant="fullWidth" />
      <div className={classes.content}>{tab === "chart" && <BarChart />}</div>
    </div>
  );
};

export default Home;
