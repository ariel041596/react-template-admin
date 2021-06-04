import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Chip,
  Paper,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";

// Components
import Loading from "../components/Loading";
import Message from "../components/Message";
import EditUser from "../components/EditUser";

import AddUser from "../components/AddUser";
import DeleteModal from "../components/DeleteModal";
import OpenSnackBar from "../components/OpenSnackBar";

import {
  USER_DELETE_RESET,
  USER_UPDATE_RESET,
} from "../constants/userConstants";
import { getUserList, deleteUser } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    minHeight: 150,
  },
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
}));

const UserListScreen = ({ history }) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [userData, setUserData] = useState("");
  const [title, setTitle] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");
  const [message, setMessage] = useState(null);
  const [messageContent, setMessageContent] = useState("");

  // State
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: userUpdateSuccess, error: userUpdateError } = userUpdate;

  const userAdd = useSelector((state) => state.userAdd);
  const { success: userAddSuccess } = userAdd;

  // useEffect
  useEffect(() => {
    dispatch({
      type: USER_DELETE_RESET,
    });
    dispatch({
      type: USER_UPDATE_RESET,
    });
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push("/login");
    }
    if (successDelete) {
      setOpenSnack(true);
      setMessage("Sucessfully deleted user!");
      setAlertTitle("Success");
      setSeverity("success");
    }
    if (userUpdateSuccess) {
      setOpenSnack(true);
      setMessage("Sucessfully changed user data!");
      setAlertTitle("Success");
      setSeverity("success");
    }
    // eslint-disable-next-line
  }, [
    dispatch,
    history,
    successDelete,
    userInfo,
    userUpdateSuccess,
    userAddSuccess,
  ]);

  //   Methods
  const handleEditUser = (user) => {
    setOpen(true);
    setUserData(user);
  };
  const handleAddUser = (user) => {
    setOpenAdd(true);
  };
  const handleDeleteUser = (user) => {
    setOpenDelete(true);
    setTitle("Delete User");
    setUserData(user._id);
    setMessageContent(`Are you sure want to delete ${user.firstName}`);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const deleteUserHandler = async (e) => {
    e.preventDefault();
    await dispatch(deleteUser(userData));
    handleCloseDelete();
  };

  return (
    <>
      {userUpdateError ? (
        <Message severity="error">{userUpdateError}</Message>
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <>
          <div>
            <div className={classes.grow}>
              <Button
                onClick={handleAddUser}
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add User
              </Button>
            </div>
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
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <Loading></Loading>
              ) : (
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell component="th" scope="row">
                        {user.firstName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.lastName}
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">
                        <Chip
                          size="small"
                          clickable
                          onDelete={() => {}}
                          deleteIcon={
                            user.isAdmin ? (
                              <VerifiedUserIcon />
                            ) : (
                              <AccountCircleIcon />
                            )
                          }
                          label={user.isAdmin ? "Admin" : "User"}
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          size="small"
                          onClick={() => handleEditUser(user)}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(user)}
                          color="secondary"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {open && (
            <EditUser
              handleClose={handleClose}
              open={open}
              user={userData}
            ></EditUser>
          )}
          {openAdd && (
            <AddUser handleClose={handleCloseAdd} open={openAdd}></AddUser>
          )}
          {openDelete && (
            <DeleteModal
              data={userData}
              title={title}
              messageContent={messageContent}
              handleClose={handleCloseDelete}
              deleteHandler={deleteUserHandler}
              open={openDelete}
            ></DeleteModal>
          )}
        </>
      )}
    </>
  );
};

export default UserListScreen;
