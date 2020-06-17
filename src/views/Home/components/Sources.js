import React, { useState, useEffect } from "react";

import {
  Fade,
  makeStyles,
  Typography,
  Grid,
  Divider,
  IconButton,
  Link,
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinkIcon from "@material-ui/icons/Link";

import axios from "axios";
import clsx from "clsx";
import Helmet from "react-helmet";

import { useTrail, animated, config } from "react-spring";

import CircularLoadingAnimation from "../../../components/CircularLoadingAnimation";

import { API_URL } from "../../../vars";

const AnimatedExpansionPanel = animated(ExpansionPanel);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(1),
    // display: "flex",
    // justifyContent: "center",
    // "&:first-child": {
    //   alignItems: "flex-end",
    // },
    // "&:nth-child(2)": {
    //   alignItems: "center",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   height: "auto",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   "&:first-child": {
    //     alignItems: "center",
    //   },
    // },
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  breakAll: {
    wordBreak: "break-all",
  },
  breakWord: {
    wordBreak: "break-word",
  },
  gridItem: {
    padding: theme.spacing(1),
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
}));

const MAP_METHOD = {
  HTML: "web scraping",
  CSV: "download and parse",
  JSON: "API call",
};

const Sources = () => {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_URL}/sources`)
      .then(({ data }) => {
        if (mounted) {
          setData(
            Object.keys(data).map((key) => ({
              source_title: key.toUpperCase(),
              ...data[key],
            }))
          );
          setFetching(false);
        }
      })
      .catch((error) => {
        alert("There's a problem. Please try again later.");
      });

    return () => (mounted = false);
  }, []);

  const trail = useTrail(data ? data.length : 0, {
    from: {
      transform: "translateY(200%)",
    },
    to: {
      transform: "translateY(0%)",
    },
    config: config.stiff,
  });

  if (fetching || !data) {
    return (
      <div className={clsx(classes.root, classes.loading)}>
        <CircularLoadingAnimation size={100} color="secondary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Chart</title>
      </Helmet>
      <div className={classes.root}>
        {data && (
          <Fade in={true} timeout={1000}>
            <div className={classes.root}>
              <Grid
                className={classes.grid}
                container={true}
                alignContent="flex-start"
              >
                {data.map((item, index) => (
                  <Grid
                    key={item.source_title}
                    className={classes.gridItem}
                    xs={12}
                    item={true}
                  >
                    <AnimatedExpansionPanel style={trail[index]}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.header}>
                          <Typography variant={"h6"}>
                            {item.source_title}
                          </Typography>
                          <IconButton
                            href={item.org_link}
                            target="_blank"
                            component={Link}
                            edge="end"
                          >
                            <LinkIcon />
                          </IconButton>
                        </div>
                      </ExpansionPanelSummary>
                      <Divider variant="fullWidth" />
                      <ExpansionPanelDetails>
                        <Grid container={true}>
                          <Grid
                            className={clsx(classes.breakAll, classes.gridItem)}
                            item={true}
                            xs={12}
                            md={4}
                            lg={3}
                          >
                            <Typography variant="overline">
                              <span>
                                <b>Data Type:</b> {item.data_type}
                              </span>
                              <br />
                              <span>
                                <b>Data Link:</b>
                                <br />
                                {item.data_link}
                              </span>
                              <br />
                              <span>
                                <b>Collection Method:</b> <br />
                                {MAP_METHOD[item.data_type]}
                              </span>
                            </Typography>
                          </Grid>
                          <Grid
                            className={clsx(
                              classes.breakWord,
                              classes.gridItem
                            )}
                            item={true}
                            xs={12}
                            md={8}
                            lg={9}
                          >
                            <Typography variant="body1">
                              <Typography variant="overline">
                                <span>
                                  <b>Description:</b>
                                </span>
                              </Typography>
                              {item.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ExpansionPanelDetails>
                    </AnimatedExpansionPanel>
                    <Divider variant={"inset"} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Fade>
        )}
      </div>
    </>
  );
};

export default Sources;
