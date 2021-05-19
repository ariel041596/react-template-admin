import React, { useState } from "react";
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

import {
  InputAdornment,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { updateUser } from "../actions/userActions";
import Loading from "./Loading";

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

const EditUser = ({ ...props }) => {
  // Variables
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [isAdmin, setIsAdmin] = useState(props.user.isAdmin);
  const classes = useStyles();
  const dispatch = useDispatch();

  // State

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading } = userUpdate;

  // Methods
  const editUserHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      updateUser({
        _id: props.user._id,
        firstName,
        lastName,
        email,
        isAdmin: isAdmin,
      })
    );
    props.handleClose();
  };

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
          Edit User
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={editUserHandler} autoComplete="off">
            <TextField
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              margin="normal"
              id="input-with-icon-name"
              placeholder="First Name"
              variant="outlined"
              fullWidth
              required
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
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              disabled
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              margin="normal"
              type="email"
              variant="outlined"
              required
              id="input-with-icon-email"
              placeholder="Last Name"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
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
                  Save changes
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUser;
