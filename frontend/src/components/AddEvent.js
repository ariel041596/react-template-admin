import "date-fns";
import React, { useState } from "react";

import {
  Button,
  InputAdornment,
  TextField,
  Drawer,
  Typography,
  CardContent,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";

// Icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles({
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
  },
  cardContent: {
    marginTop: 20,
  },
});

const AddEvent = ({ ...props }) => {
  // Varialbles
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(props.data.start);
  const [end, setEnd] = useState();

  // Methods
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const handleStartDateChange = (date) => {
    setStart(date);
    const minutes = 30;
    const end = new Date(date.getTime() + minutes * 60000);
    setEnd(end);
  };
  const handleEndDateChange = (date) => {};

  return (
    <Drawer anchor="right" open={props.open} onClose={props.handleClose}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Add Event
        </Typography>
        <form onSubmit={submitHandler} autoComplete="off">
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            margin="normal"
            id="input-with-icon-name"
            placeholder="Event Title"
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
            onChange={(e) => setStart(e.target.value)}
            value={start}
            margin="normal"
            id="input-with-icon-name"
            placeholder="Event Title"
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              disablePast="true"
              margin="normal"
              fullWidth
              required
              label="Event Start Date"
              inputVariant="outlined"
              value={start}
              onChange={handleStartDateChange}
            />
            <DateTimePicker
              disablePast="true"
              margin="normal"
              fullWidth
              required
              label="Event End Date"
              inputVariant="outlined"
              value={end}
              onChange={handleEndDateChange}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.grow}>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Event
            </Button>
          </div>
        </form>
      </CardContent>
    </Drawer>
  );
};

export default AddEvent;
