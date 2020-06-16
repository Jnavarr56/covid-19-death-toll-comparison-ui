import React, { useEffect, useState } from "react";

import { makeStyles, Fade } from "@material-ui/core";

import axios from "axios";

import CircularLoadingAnimation from "../../../components/CircularLoadingAnimation";

import { API_URL } from "../../../vars";

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(3, 0, 3, 0),
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
  },
}));

const Sources = ({ dataset }) => {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API_URL}/sources`)
      .then(({ data }) => {
        if (mounted) {
          console.log(data);
          setData(data);
          setFetching(false);
        }
      })
      .catch((error) => {
        alert("issue");
      });

    return () => (mounted = false);
  }, []);

  return (
    <div className={classes.root}>
      {fetching || !data ? (
        <CircularLoadingAnimation size={100} color="secondary" />
      ) : (
        <Fade in={true}>
          <div className={classes.content}>
            {/* <ReactDataSheet
              data={data}
              valueRenderer={(cell) => {
                console.log(cell);
                return cell;
              }}
            /> */}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default Sources;
