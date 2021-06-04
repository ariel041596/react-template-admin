import "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  InputAdornment,
  TextField,
  Typography,
  Dialog,
  Button,
  CardContent,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

// Icons
import AssignmentIcon from "@material-ui/icons/Assignment";

import { makeStyles } from "@material-ui/core/styles";

import { TASK_ADD_RESET } from "../constants/taskConstants";

import { addTask } from "../actions/taskActions";
import Loading from "./Loading";

const useStyles = makeStyles({
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
  },
});

const AddTask = ({ ...props }) => {
  // Variables
  const dispatch = useDispatch();
  const min = 30;
  const classes = useStyles();
  const [task, setTask] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date().getTime() + min * 60000);

  // State
  const taskAdd = useSelector((state) => state.taskAdd);
  const { loading } = taskAdd;

  // MEthods
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addTask(task, start, end));
    props.handleClose();
  };
  const handleStartDateChange = (date) => {
    setStart(date);
    const minutes = 30;
    const end = new Date(date.getTime() + minutes * 60000);
    setEnd(end);
  };
  const handleEndDateChange = (date) => {
    setEnd(date);
  };

  // UseEffect
  useEffect(() => {
    dispatch({
      type: TASK_ADD_RESET,
    });
  }, [dispatch]);

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Add Task
        </Typography>
        <form onSubmit={submitHandler} autoComplete="off">
          <TextField
            onChange={(e) => setTask(e.target.value)}
            value={task}
            margin="normal"
            id="input-with-icon-name"
            variant="outlined"
            label="Task Name"
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon />
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
              label="Task Start Date"
              inputVariant="outlined"
              value={start}
              onChange={handleStartDateChange}
            />
            <DateTimePicker
              disablePast="true"
              margin="normal"
              fullWidth
              required
              label="Task End Date"
              inputVariant="outlined"
              value={end}
              onChange={handleEndDateChange}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.grow}>
            {loading ? (
              <Loading></Loading>
            ) : (
              <>
                <Button onClick={props.handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add Task
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Dialog>
  );
};

export default AddTask;
