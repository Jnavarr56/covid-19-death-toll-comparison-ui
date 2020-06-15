import React from "react";
import { Fade, CircularProgress } from "@material-ui/core";

const LoadingAnimation = () => {
  return (
    <Fade in={true}>
      <CircularProgress size={100} color={"secondary"} />
    </Fade>
  );
};

export default LoadingAnimation;
