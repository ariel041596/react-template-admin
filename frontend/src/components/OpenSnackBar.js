import React, { useState } from "react";
import { IconButton, Snackbar } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const OpenSnackBar = ({ ...props }) => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={props.open}
      autoHideDuration={6000}
      onClose={() => {
        props.handleOpenSnack(false);
      }}
    >
      <Alert
        severity={props.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              props.handleOpenSnack(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{props.alertTitle}</AlertTitle>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default OpenSnackBar;
