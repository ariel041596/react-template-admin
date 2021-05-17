import React from "react";
import { IconButton, Collapse } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const OpenSnackBar = ({ ...props }) => {
  return (
    <Collapse in={props.open}>
      <Alert
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
        {props.message}
      </Alert>
    </Collapse>
  );
};

export default OpenSnackBar;
