import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Fade,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Chart from "react-apexcharts";
import { CountUp } from "use-count-up";

const config = {
  options: {
    labels: ["New York Times", "CDC", "John Hopkins CSSE"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "100%",
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

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
}));

const BarChart = () => {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${process.env.REACT_APP_API_URL}/results`)
      .then(({ data }) => {
        if (mounted) {
          setData(data);
          setFetching(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("issue");
      });

    return () => (mounted = false);
  }, []);

  const LoadingAnimation = () => {
    return (
      <Fade in={true}>
        <CircularProgress size={100} color={"secondary"} />
      </Fade>
    );
  };

  const HeaderText = () => {
    if (!data) return null;

    const { nyt, cdc } = data;
    const higher = Math.max(nyt.death_count, cdc.death_count);
    const lower = Math.min(nyt.death_count, cdc.death_count);

    return (
      <Typography variant="h4">
        The
        {` ${higher === nyt.death_count ? "New York Times" : "CDC"} `}
        is reporting{" "}
        <span className={classes.bold}>
          <CountUp isCounting={true} start={0} end={higher - lower} />
        </span>{" "}
        more deaths.
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      {fetching || !data ? (
        <LoadingAnimation />
      ) : (
        <Fade in={true}>
          <div className={classes.content}>
            <HeaderText />
            <Chart
              type="bar"
              width={800}
              options={config.options}
              series={[
                {
                  name: "NYT vs. CDC vs. JSU CSSE Covid-19 Death Counts",
                  data: [
                    data.nyt.death_count,
                    data.cdc.death_count,
                    data.jhu.death_count,
                  ],
                },
              ]}
            />
          </div>
        </Fade>
      )}
    </div>
  );
};

export default BarChart;
