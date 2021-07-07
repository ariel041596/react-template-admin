import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Zoom,
} from "@material-ui/core";

//   Icons
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DeleteIcon from "@material-ui/icons/Delete";

import { blue } from "@material-ui/core/colors";

import AddTask from "../components/AddTask";
import Loading from "../components/Loading";
import OpenSnackBar from "../components/OpenSnackBar";
import Message from "./Message";
import DeleteModal from "../components/DeleteModal";

import { TASK_ADD_RESET, TASK_DELETE_RESET } from "../constants/taskConstants";
import { getMyTasks, deleteTask } from "../actions/taskActions";

const useStyles = makeStyles((theme) => ({
  blue: {
    color: blue[500],
  },
  task: {
    marginTop: -30,
  },
  grow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  noTask: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Task = ({ history }) => {
  // Variables
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");
  const [message, setMessage] = useState(null);
  const [taskData, setTaskData] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const dispatch = useDispatch();

  // State
  const myTaskList = useSelector((state) => state.myTaskList);
  const { loading, error, myTasks } = myTaskList;

  const taskAdd = useSelector((state) => state.taskAdd);
  const { success: taskAddSuccess, error: taskAddError } = taskAdd;

  const taskDelete = useSelector((state) => state.taskDelete);
  const { success: taskDeleteSuccess, error: taskDeleteError } = taskDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Methods
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (taskID) => {
    setOpenDelete(true);
    setTitle("Delete Task");
    setTaskData(taskID);
    setMessageContent(`Are you sure want to delete task?`);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const deleteTaskHandler = async (e) => {
    e.preventDefault();
    await dispatch(deleteTask(taskData));
    handleCloseDelete();
  };

  // UseEffect
  useEffect(() => {
    dispatch({
      type: TASK_DELETE_RESET,
    });
    dispatch({
      type: TASK_ADD_RESET,
    });
    if (userInfo && userInfo.isAdmin) {
      dispatch(getMyTasks());
    }
    if (taskAddSuccess) {
      setOpenSnack(true);
      setMessage("Successfully added task!");
      setAlertTitle("Success");
      setSeverity("success");
    }
    if (taskAddError) {
      setOpenSnack(true);
      setMessage(`${taskAddError}`);
      setAlertTitle("Error");
      setSeverity("error");
    }
    if (taskDeleteSuccess) {
      setOpenSnack(true);
      setMessage("Sucessfully deleted task!");
      setAlertTitle("Success");
      setSeverity("success");
    }
    if (taskDeleteError) {
      setOpenSnack(true);
      setMessage(`${taskAddError}`);
      setAlertTitle("Error");
      setSeverity("error");
    }
  }, [
    dispatch,
    history,
    userInfo,
    taskAddSuccess,
    taskAddError,
    taskDeleteSuccess,
    taskDeleteError,
  ]);

  return (
    <>
      {error && <Message severity="error">{error}</Message>}
      {openSnack && (
        <OpenSnackBar
          severity={severity}
          alertTitle={alertTitle}
          open={openSnack}
          message={message}
          handleOpenSnack={() => {
            setOpenSnack(false);
          }}
        ></OpenSnackBar>
      )}
      <Card>
        <Grid container spacing={1}>
          <Grid item xs={9} sm={9} md={9} lg={9}>
            <CardContent>
              <Typography
                variant="h6"
                display="block"
                color="textPrimary"
                gutterBottom
              >
                Task to Do
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <div className={classes.grow}>
              {loading ? (
                <Loading></Loading>
              ) : (
                <Tooltip
                  arrow
                  TransitionComponent={Zoom}
                  title="Add Task"
                  placement="top"
                >
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                    aria-label="add to tasks"
                  >
                    <AddAlertIcon color="primary" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </Grid>
        </Grid>
        {myTasks.length === 0 ? (
          <CardContent className={classes.noTask}>
            <Typography>No Task Added</Typography>
          </CardContent>
        ) : (
          <Grid item xs={12} md={12}>
            <div className={classes.task}>
              <List>
                {myTasks.map((myTask) => (
                  <ListItem key={myTask._id}>
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={myTask.task}
                      secondary={myTask.start}
                    />
                    <ListItemSecondaryAction color="primary">
                      <Tooltip
                        arrow
                        TransitionComponent={Zoom}
                        title="Edit Task"
                        placement="top"
                      >
                        <IconButton edge="end" aria-label="edit">
                          <AssignmentTurnedInIcon className={classes.blue} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        arrow
                        TransitionComponent={Zoom}
                        title="Delete Task"
                        placement="top"
                      >
                        <IconButton
                          onClick={() => handleDelete(myTask._id)}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        )}
      </Card>
      {open && <AddTask open={open} handleClose={handleClose}></AddTask>}
      {openDelete && (
        <DeleteModal
          data={taskData}
          title={title}
          messageContent={messageContent}
          handleClose={handleCloseDelete}
          deleteHandler={deleteTaskHandler}
          open={openDelete}
        ></DeleteModal>
      )}
    </>
  );
};

export default Task;
