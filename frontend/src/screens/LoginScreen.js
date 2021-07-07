import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import MailIcon from "@material-ui/icons/Mail";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Avatar, Button, Typography } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import Meta from "../components/Meta";

import Loading from "../components/Loading";
import Message from "../components/Message";

import { loginUser } from "../actions/userActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    position: "absolute",
    top: 150,
    left: 12,
    right: 12,
    margin: "auto",
  },

  field: {
    margin: 12,
  },
  button: {
    margin: "auto",
  },
  avatar: {
    display: "absolute",
    margin: "auto",
    height: 100,
    width: 100,
  },
  title: {
    textAlign: "center",
    marginTop: 20,
  },
  login: {
    marginTop: 5,
  },
});

const LoginScreen = ({ location, history }) => {
  // Variables
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });
  const redirect = location.search ? location.search.split("=")[1] : "/";

  //   Dispatch
  const dispatch = useDispatch();

  //   State
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //   Effect
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // Methods
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Meta title="React Template | Login"></Meta>
      <form onSubmit={loginHandler} className={classes.root}>
        <div className={classes.field}>
          <Avatar className={classes.avatar} alt="" src="/logo.png"></Avatar>
          <Typography className={classes.title} variant="h4">
            Login
          </Typography>
        </div>
        <div>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            fullWidth
            id="outlined-email"
            variant="outlined"
            label="Email"
            color="primary"
            InputProps={{
              startadornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle email visibility" edge="end">
                    <MailIcon></MailIcon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <div>
          <TextField
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={values.showPassword ? "text" : "password"}
            required
            fullWidth
            id="outlined-password"
            variant="outlined"
            color="primary"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <div>
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.login}
            disabled={loading}
          >
            Sign In
          </Button>
          <p>
            Don't have an account?{" "}
            <Link
              variant="primary"
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </p>
        </div>
        <div>
          {error && <Message severity="error">{error}</Message>}
          {loading && <Loading></Loading>}
        </div>
      </form>
    </>
  );
};

export default LoginScreen;
