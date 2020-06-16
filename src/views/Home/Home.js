import React, { useState, useEffect } from "react";
import BarChart from "./components/BarChart";
import Sources from "./components/Sources";
import { makeStyles, Divider, Tab, Tabs } from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import DescriptionIcon from "@material-ui/icons/Description";
import { useParams, useLocation, useHistory } from "react-router-dom";

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
    overflow: "hidden",
    width: "100%",
    flexGrow: 1,
  },
  tabLabel: {
    display: "flex",
    "& *:first-child": {
      marginLeft: 6,
    },
  },
}));

const TABS = [
  {
    label: "chart",
    slug: "chart",
    icon: <InsertChartIcon />,
    view: <BarChart />,
  },
  {
    label: "sources",
    slug: "sources",
    icon: <DescriptionIcon />,
    view: <Sources />,
  },
];

const Home = () => {
  const classes = useStyles();

  const params = useParams();
  const location = useLocation();
  const history = useHistory();

  const [tab, setTab] = useState("");

  const renderTab = TABS.find((tab) => tab.slug === params.tab);

  useEffect(() => {
    if (renderTab) {
      setTab(params.tab);
    } else {
      history.push(`/${location.pathname.split("/")[1]}/${TABS[0].slug}`);
    }
  }, [params.tab, history, location.pathname, renderTab]);

  const handleChange = (ev, newValue) => {
    if (newValue !== params.tab) {
      history.push(`/${location.pathname.split("/")[1]}/${newValue}`);
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        value={tab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.label}
            label={
              <span className={classes.tabLabel}>
                {tab.label}
                {tab.icon}
              </span>
            }
            value={tab.slug}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} variant="fullWidth" />
      <div className={classes.content}>{renderTab && renderTab.view}</div>
    </div>
  );
};

export default Home;
