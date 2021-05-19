import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Breadcrumbs,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import Meta from "../components/Meta";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  breadcrumbs: {
    marginBottom: 12,
  },
  link: {
    color: "grey",
  },
});

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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeScreen;
