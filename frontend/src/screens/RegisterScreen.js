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

import { registerUser } from "../actions/userActions";
import { USER_REGISTER_RESET } from "../constants/userConstants";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    position: "absolute",
    left: 12,
    right: 12,
    margin: "auto",
    // bottom: 30,
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

const RegisterScreen = ({ location, history }) => {
  // Variables
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageMatch, setMessageMatch] = useState(null);
  const [values, setValues] = useState({
    showPassword: false,
  });
  const redirect = location.search ? location.search.split("=")[1] : "/";

  //   Dispatch
  const dispatch = useDispatch();

  //   State
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  //   Effect
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // Methods
  const registerHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: USER_REGISTER_RESET,
    });
    setMessage(null);
    setMessageMatch(null);
    const pass = password;
    const confirmPass = confirmPassword;
    const reg = new RegExp("^(?=.*[a-z])(?=.{6,})");
    const testPass = reg.test(pass);
    const testConfirmPass = reg.test(confirmPass);
    if (!testPass && !testConfirmPass) {
      setMessage("Password must contain 6 characters");
    } else if (password !== confirmPassword) {
      setMessageMatch("Password do not match");
    } else {
      dispatch(registerUser(firstName, lastName, email, password));
    }
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCheckPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <Meta title="React Template | Register"></Meta>
      <form onSubmit={registerHandler} className={classes.root}>
        <div className={classes.field}>
          <Avatar className={classes.avatar} alt="" src="/logo.png"></Avatar>
          <Typography className={classes.title} variant="h4">
            Register
          </Typography>
        </div>
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          type="text"
          required
          fullWidth
          id="outlined-first-name"
          variant="outlined"
          label="First Name"
          color="primary"
        ></TextField>
        <TextField
          style={{ margin: "10px 0" }}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          type="text"
          required
          fullWidth
          id="outlined-last-name"
          variant="outlined"
          label="Last Name"
          color="primary"
        ></TextField>
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
        <TextField
          style={{ margin: "10px 0" }}
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
        <TextField
          onChange={(e) => handleCheckPassword(e)}
          value={confirmPassword}
          type={values.showPassword ? "text" : "password"}
          required
          fullWidth
          id="outlined-confirm-password"
          variant="outlined"
          color="primary"
          label="Confirm Password"
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
        <div>
          <Button
            disabled={loading}
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.login}
          >
            Register
          </Button>
          <p>
            Already have an account?{" "}
            <Link
              variant="primary"
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Login
            </Link>
          </p>
        </div>
        <div>
          {messageMatch && <Message severity="error">{messageMatch}</Message>}
          {message && <Message severity="error">{message}</Message>}
          {error && <Message severity="error">{error}</Message>}
          {loading && <Loading></Loading>}
        </div>
      </form>
    </>
  );
};

export default RegisterScreen;
