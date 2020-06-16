import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-datasheet/lib/react-datasheet.css";
import { makeStyles, Fade, CircularProgress } from "@material-ui/core";

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
      .get(`${process.env.REACT_APP_API_URL}/sources`)
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

  const LoadingAnimation = () => {
    return (
      <Fade in={true}>
        <CircularProgress size={100} color={"secondary"} />
      </Fade>
    );
  };

  return (
    <div className={classes.root}>
      {fetching || !data ? (
        <LoadingAnimation />
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
