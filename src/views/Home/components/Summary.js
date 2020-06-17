import React, { useState, useEffect } from "react";

import {
  makeStyles,
  Fade,
  Divider,
  Card as MuiCard,
  CardHeader,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";

import axios from "axios";
import clsx from "clsx";
import Helmet from "react-helmet";
import { CountUp } from "use-count-up";
import { useTrail, animated, config } from "react-spring";

import CircularLoadingAnimation from "../../../components/CircularLoadingAnimation";
import { API_URL } from "../../../vars";

const Card = animated(MuiCard);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  card: {
    height: 300,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  cardHeader: {
    height: 100,
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    height: "100%",
    overflowY: "auto",
  },
  gridItem: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MAP_TITLES = {
  cdc: {
    title: "Centers for Disease Control and Prevention",
  },
  nyt: {
    title: "The New York Times",
  },
  jhu: {
    title: "Johns Hopkins University CSSE",
  },
};

const Summary = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_URL}/results`)
      .then(({ data }) => {
        if (mounted) {
          setData(
            Object.keys(data).map((key) => ({
              title: MAP_TITLES[key].title,
              death_count: data[key].death_count,
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
      transform: "translateY(100%)",
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
        <title>Summary</title>
      </Helmet>
      <div className={classes.root}>
        {data && (
          <Fade in={true} timeout={1000}>
            <div className={clsx(classes.root, classes.content)}>
              <Grid
                className={classes.grid}
                container={true}
                justify={"space-evenly"}
              >
                {data.map((source, index) => (
                  <Grid
                    key={source.title}
                    className={classes.gridItem}
                    item={true}
                    xs={12}
                    md={3}
                  >
                    <Card
                      style={trail[index]}
                      className={classes.card}
                      key={source.title}
                    >
                      <CardHeader
                        titleTypographyProps={{
                          align: "center",
                        }}
                        className={classes.cardHeader}
                        title={source.title}
                      />
                      <Divider />
                      <CardContent className={classes.cardContent}>
                        <Typography variant={"h4"}>
                          <CountUp
                            isCounting={true}
                            start={0}
                            end={source.death_count}
                          />
                        </Typography>
                      </CardContent>
                    </Card>
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

export default Summary;
