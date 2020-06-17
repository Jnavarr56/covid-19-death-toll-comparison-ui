import React from "react";

import { makeStyles, Divider, Typography, Link } from "@material-ui/core";
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
}));

const LINKS = [
  {
    label: "Email",
    prefix: "mailto:",
    link: "jnavarr56@gmail.com",
  },
  {
    label: "Github Profile",
    prefix: "https://",
    link: "github.com/Jnavarr56",
  },
  {
    label: "Original Script Repo",
    prefix: "https://",
    link: "github.com/Jnavarr56/covid-19-death-toll-comparison",
  },
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
  {
    label: "LinkedIn",
    prefix: "https://",
    link: "linkedin.com/in/jnavarr5",
  },
];

const About = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className={classes.root}>
        <div className={classes.contentContainer}>
          <Typography variant="h4">About</Typography>
          <Divider className={classes.divider} fullWidth />
          <Typography variant="body1" gutterBottom={true}>
            <br />
            Data is refreshed every day at 9am and 6pm.
            <br />
            <br />
            I spotted a Ruby on Rails job that I thought I would be great for
            and was about to apply but was worried that since I've been working
            with Node.js recently instead of Ruby (current project is a Node.js
            microservices based API), that the lack of a current Rails project
            would hurt my application. I'd been thinking about doing something
            with Covid-19 data so I quickly wrote a Ruby script to aggregate
            some death counts and then translated the functionality into an Ruby
            on Rails API application. I then build this simple React UI to pull
            data from that API.
            <br />
            <br />
            My thinking was that the CDC's data might show underreporting so I
            decided to compare it to other sources. Getting a definitive CDC
            figure was difficult so I decided to have the API scrape the CDC's
            HTML and use that as the figure.
            <br />
            <br />
            The Ruby on Rails API is containerized in a docker-compose network
            that also contains a Redis server, and is deployed on an AWS EC2
            instance running Amazon Linux 2. NGINX is used for routing/SSL
            proxying.
            <br />
            <br />
            The React UI uses Material-UI and is deployed on Netlify.
            <br />
            <br />
            You can send requests to the API from non-browser origins to:
            <ul>
              <li>https://api.coviddeathtollcomparison.com/results</li>
              <li>https://api.coviddeathtollcomparison.com/sources</li>
            </ul>
          </Typography>
          <Typography variant="h4">Personal Info</Typography>
          <Divider className={classes.divider} fullWidth />
          <Typography variant="body1" gutterBottom={true}>
            <ul>
              {LINKS.map((item) => (
                <li key={item.label}>
                  <b>{item.label}</b>{" "}
                  <Link label={item.label} to={item.prefix + item.link}>
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default About;
