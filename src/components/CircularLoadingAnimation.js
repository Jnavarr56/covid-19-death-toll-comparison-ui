import React from "react";

import { Fade, CircularProgress } from "@material-ui/core";

import PropTypes from "prop-types";

const CircularLoadingAnimation = ({ className, size, color }) => {
  return (
    <Fade className={className} in={true}>
      <CircularProgress size={size} color={color} />
    </Fade>
  );
};

CircularLoadingAnimation.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.oneOf(["primary", "secondary", "inherit"]),
};

export default CircularLoadingAnimation;
