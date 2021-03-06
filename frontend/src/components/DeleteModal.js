import React from "react";
import { useSelector } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import { Typography } from "@material-ui/core";

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

const DeleteModal = ({ ...props }) => {
  // Variables
  const classes = useStyles();

  // State
  const userDelete = useSelector((state) => state.userDelete);
  const { loading } = userDelete;

  const taskDelete = useSelector((state) => state.taskDelete);
  const { loading: taskLoading } = taskDelete;

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
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{props.messageContent}</Typography>
          <div className={classes.grow}>
            {loading || taskLoading ? (
              <Loading></Loading>
            ) : (
              <Button
                onClick={props.deleteHandler}
                variant="contained"
                autoFocus
                color="secondary"
              >
                Delete
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
