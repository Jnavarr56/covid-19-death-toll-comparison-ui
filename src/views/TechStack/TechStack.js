import React from "react";

import { makeStyles, Divider, Typography, Link, Fade } from "@material-ui/core";

import LinkIcon from "@material-ui/icons/Link";

import clsx from "clsx";
import Helmet from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(0, 3),
    position: "relative",
  },
  contentContainer: {
    height: "100%",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "85%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "auto",
  },
  divider: {
    width: "100%",
    flexShrink: 0,
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  linkWithIcon: {
    display: "flex",
    "& *:first-child": {
      marginRight: theme.spacing(0.5),
    },
  },
}));

const STACK = [
  {
    label: "Docker Compose",
    use: "Orchestrate Ruby on Rails API container and Redis container.",
    link: "https://docs.docker.com/compose/",
  },
  {
    label: "Ruby on Rails",
    use: "Web application framework. Used to create this API only application.",
    link: "https://rubyonrails.org/",
  },
  {
    label: "Redis",
    use: "In memory data store used as a cache.",
    link: "https://redis.io/",
  },
  {
    label: "NGINX",
    use: "Server used for routing and ssl (https).",
    link: "https://www.nginx.com",
  },
  {
    label: "Nokogiri",
    use: "(Ruby gem) HTML parser used to grab data from CDC.",
    link: "https://nokogiri.org",
  },
  {
    label: "Rack CORS",
    use: "(Ruby gem) Packaging allowing for CORS configuration.",
    link: "https://github.com/cyu/rack-cors",
  },
  {
    label: "Amazon Elastic Compute Cloud (AWS EC2)",
    use: "Linux server space to host API.",
    link: "https://aws.amazon.com/ec2",
  },

  {
    label: "React",
    use: "JavaScript library for building UI",
    link: "https://reactjs.org",
  },
  {
    label: "Material UI",
    use: "A popular React UI framework",
    link: "https://material-ui.com",
  },
  {
    label: "Netlify",
    use: "Continuous Ingegration and hosting for UI.",
    link: "https://www.netlify.com/about/",
  },
];

const REPOS = [
  {
    label: "API Repo",
    prefix: "https://",
    link: "github.com/Jnavarr56/covid-19-death-toll-comparison-api",
  },
  {
    label: "UI Repo",
    prefix: "https://",
    link: "github.com/Jnavarr56/covid-19-death-toll-comparison-ui",
  },
];

const TechStack = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Tech Stack</title>
      </Helmet>
      <Fade in={true} timeout={1000}>
        <div className={classes.root}>
          <div className={classes.contentContainer}>
            <Typography variant="h4">Technologies</Typography>
            <Divider className={classes.divider} fullWidth />
            <Typography variant="body1" gutterBottom={true}>
              <ul>
                {STACK.map((item) => (
                  <li key={item.label}>
                    <b>
                      <Link
                        className={clsx(classes.link, classes.linkWithIcon)}
                        to={item.link}
                      >
                        <span>{item.label}</span>
                        <LinkIcon />
                      </Link>
                    </b>
                    <ul>
                      <li>{item.use}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </Typography>
            <Typography variant="h4">Repos</Typography>
            <Divider className={classes.divider} fullWidth />
            <Typography variant="body1" gutterBottom={true}>
              <ul>
                {REPOS.map((item) => (
                  <li className={classes.li} key={item.label}>
                    <b>{item.label}:</b>{" "}
                    <Link
                      className={classes.link}
                      label={item.label}
                      to={item.prefix + item.link}
                    >
                      {item.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </Typography>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default TechStack;
