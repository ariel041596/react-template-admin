import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { blue, green, pink, red, teal } from "@material-ui/core/colors";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Breadcrumbs,
  Avatar,
} from "@material-ui/core";

// Icons
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from "@material-ui/icons/Group";
import FlagIcon from "@material-ui/icons/Flag";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { Link } from "react-router-dom";

import Meta from "../components/Meta";
import Calendar from "../components/Calendar";
import Task from "../components/Task";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 18,
  },
  breadcrumbs: {
    marginBottom: 12,
  },
  link: {
    color: "grey",
  },
  cardContent: {
    display: "flex",
  },
  cardAvatar: {
    flexGrow: 1,
  },
  grow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  red: {
    color: "#fff",
    backgroundColor: red[500],
  },
  teal: {
    color: "#fff",
    backgroundColor: teal[500],
  },
  blue: {
    color: blue[500],
  },
  task: {
    marginTop: -30,
  },
}));

const HomeScreen = ({ match, history }) => {
  // Variables
  const classes = useStyles();
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  // State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, keyword, pageNumber, history, userInfo]);

  return (
    <>
      <Meta></Meta>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link className={classes.link} to="/">
          Home
        </Link>
        <Typography color="primary">Dashboard</Typography>
      </Breadcrumbs>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.root}>
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography
                    variant="button"
                    display="block"
                    color="textSecondary"
                    gutterBottom
                    className={classes.cardAvatar}
                  >
                    Total Users
                  </Typography>
                  <Avatar className={classes.green}>
                    {" "}
                    <GroupIcon></GroupIcon>
                  </Avatar>
                </div>
                <Typography
                  variant="h4"
                  display="block"
                  color="textPrimary"
                  gutterBottom
                >
                  1,600
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.root}>
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography
                    variant="button"
                    display="block"
                    color="textSecondary"
                    gutterBottom
                    className={classes.cardAvatar}
                  >
                    Total Request
                  </Typography>
                  <Avatar className={classes.pink}>
                    {" "}
                    <AssignmentIcon />
                  </Avatar>
                </div>
                <Typography
                  variant="h4"
                  display="block"
                  color="textPrimary"
                  gutterBottom
                >
                  1,600
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.root}>
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography
                    variant="button"
                    display="block"
                    color="textSecondary"
                    gutterBottom
                    className={classes.cardAvatar}
                  >
                    Total Pending
                  </Typography>
                  <Avatar className={classes.red}>
                    <FlagIcon />
                  </Avatar>
                </div>
                <Typography
                  variant="h4"
                  display="block"
                  color="textPrimary"
                  gutterBottom
                >
                  1,600
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card className={classes.root}>
              <CardContent>
                <div className={classes.cardContent}>
                  <Typography
                    variant="button"
                    display="block"
                    color="textSecondary"
                    gutterBottom
                    className={classes.cardAvatar}
                  >
                    Total Approved
                  </Typography>
                  <Avatar className={classes.teal}>
                    <ThumbUpIcon />
                  </Avatar>
                </div>
                <Typography
                  variant="h4"
                  display="block"
                  color="textPrimary"
                  gutterBottom
                >
                  1,600
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Calendar></Calendar>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Task></Task>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
