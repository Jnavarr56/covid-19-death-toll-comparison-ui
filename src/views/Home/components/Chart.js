import React, { useState, useEffect } from "react";

import {
  Fade,
  makeStyles,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import axios from "axios";
import clsx from "clsx";
import Helmet from "react-helmet";
import ApexChart from "react-apexcharts";
import { CountUp } from "use-count-up";

import CircularLoadingAnimation from "../../../components/CircularLoadingAnimation";

import { API_URL } from "../../../vars";

const config = {
  options: {
    labels: [
      "New York Times",
      "The Center for Disease Control and Prevention",
      "John Hopkins CSSE",
    ],
    chart: {
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fill: {
      opacity: 0.9,
      type: "solid",
      colors: ["#F44336"],
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },
  },
};

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
  grid: {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  gridItem: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    "&:first-child": {
      alignItems: "flex-end",
    },
    "&:nth-child(2)": {
      alignItems: "center",
    },
    [theme.breakpoints.up("sm")]: {
      height: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      "&:first-child": {
        alignItems: "center",
      },
    },
  },
}));

const Chart = () => {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  const theme = useTheme();
  const sm = useMediaQuery(`(min-width: ${theme.breakpoints.values.sm}px)`);
  const md = useMediaQuery(`(min-width: ${theme.breakpoints.values.md}px)`);
  const lg = useMediaQuery(`(min-width: ${theme.breakpoints.values.lg}px)`);
  const xl = useMediaQuery(`(min-width: ${theme.breakpoints.values.xl}px)`);

  const chartWidths = [900, 600, 910, 550];
  const screenSizesMatches = [xl, lg, md, sm];
  const screenMatch = screenSizesMatches.findIndex((match) => match);
  const chartWidth = screenMatch > -1 ? chartWidths[screenMatch] : 300;

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_URL}/results`)
      .then(({ data }) => {
        if (mounted) {
          setData(data);
          setFetching(false);
        }
      })
      .catch((error) => {
        alert("There's a problem. Please try again later.");
      });

    return () => (mounted = false);
  }, []);

  if (fetching || !data) {
    return (
      <div className={clsx(classes.root, classes.loading)}>
        <CircularLoadingAnimation size={100} color="secondary" />
      </div>
    );
  }

  const figures = [
    {
      provider: "The New York Times",
      figure: data.nyt.death_count,
    },
    {
      provider: "John Hopkin's CSSE",
      figure: data.jhu.death_count,
    },
    {
      provider: "The Center for Disease Control and Prevention",
      figure: data.cdc.death_count,
    },
  ].sort((a, b) => b.figure - a.figure);

  const gteOne = figures[0].figure - figures[1].figure;
  const gteTwo = figures[0].figure - figures[2].figure;

  const HeaderText = (
    <Typography variant="h4">
      <b>{figures[0].provider}</b>
      {" is reporting "}
      <b>
        <CountUp isCounting={true} start={0} end={gteOne} />
      </b>
      {" more deaths than "} <b>{figures[1].provider}</b>
      {" is reporting and "}
      <b>
        <CountUp isCounting={true} start={0} end={gteTwo} />
      </b>
      {" more deaths than "}
      <b>{figures[2].provider}</b>
      {" is reporting."}
    </Typography>
  );

  return (
    <>
      <Helmet>
        <title>Chart</title>
      </Helmet>
      <div className={classes.root}>
        {data && (
          <Fade in={true}>
            <div className={classes.root}>
              <Grid
                className={classes.grid}
                container={true}
                justify={"center"}
              >
                <Grid
                  className={classes.gridItem}
                  xs={12}
                  lg={5}
                  xl={4}
                  item={true}
                >
                  {HeaderText}
                </Grid>
                <Grid
                  className={classes.gridItem}
                  xs={12}
                  lg={5}
                  xl={6}
                  item={true}
                >
                  <ApexChart
                    type={"bar"}
                    width={chartWidth}
                    options={config.options}
                    series={[
                      {
                        data: [
                          data.nyt.death_count,
                          data.cdc.death_count,
                          data.jhu.death_count,
                        ],
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            </div>
          </Fade>
        )}
      </div>
    </>
  );
};

export default Chart;
