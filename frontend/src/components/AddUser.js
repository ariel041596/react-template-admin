import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {
  InputAdornment,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import Loading from "./Loading";
import Message from "./Message";

import { USER_ADD_RESET } from "../constants/userConstants";

import { addUser } from "../actions/userActions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles({
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const AddUser = ({ ...props }) => {
  // Variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  // State

  const userAdd = useSelector((state) => state.userAdd);
  const { loading, error, success } = userAdd;

  // Methods
  const addUserHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSuccessMessage(null);
    dispatch({
      type: USER_ADD_RESET,
    });
    const pass = password;
    const reg = new RegExp("^(?=.*[a-z])(?=.{6,})");
    const testPass = reg.test(pass);
    if (!testPass) {
      setMessage("Password must contain 6 characters");
    } else {
      await dispatch(addUser(firstName, lastName, email, password, isAdmin));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch({
      type: USER_ADD_RESET,
    });
    if (success) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      setSuccessMessage("Successfully added user");
    }
  }, [dispatch, success]);

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Add User
        </DialogTitle>
        <DialogContent dividers>
          {error && <Message severity="error">{error}</Message>}
          {message && <Message severity="error">{message}</Message>}
          {successMessage && (
            <Message severity="success">{successMessage}</Message>
          )}
          <form onSubmit={addUserHandler} autoComplete="off">
            <TextField
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              margin="normal"
              id="input-with-icon-name"
              placeholder="First Name"
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              margin="normal"
              id="input-with-icon-name"
              placeholder="Last Name"
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              margin="normal"
              type="email"
              required
              variant="outlined"
              id="input-with-icon-email"
              placeholder="Email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
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
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  name="checkedA"
                />
              }
              label="Is Admin"
            />
            <div className={classes.grow}>
              {loading ? (
                <Loading></Loading>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  autoFocus
                  color="primary"
                >
                  Add User
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
