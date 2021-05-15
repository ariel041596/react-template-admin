import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Chip,
  Avatar,
  Paper,
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AddIcon from "@material-ui/icons/Add";

// Components
import Loading from "../components/Loading";
import Message from "../components/Message";
import EditUser from "../components/EditUser";

import { getUserList, deleteUser } from "../actions/userActions";
import AddUser from "../components/AddUser";
import DeleteModal from "../components/DeleteModal";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    minHeight: 150,
  },
  grow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
});

const UserListScreen = ({ history }) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userData, setUserData] = useState("");
  const [title, setTitle] = useState("");
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
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
    } else {
      history.push("/login");
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
    setMessageContent(`Are you sure want to delete ${user.name}`);
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

  return (
    <>
      {userUpdateError ? (
        <Message severity="error">{userUpdateError}</Message>
      ) : error ? (
        <Message severity="error">{error}</Message>
      ) : (
        <>
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

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
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
                        {user.name}
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">
                        {user.isAdmin ? (
                          <Chip
                            size="small"
                            avatar={
                              <Avatar>
                                <VerifiedUserIcon></VerifiedUserIcon>
                              </Avatar>
                            }
                            label="Admin"
                            color="primary"
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            avatar={
                              <Avatar>
                                <AddIcon></AddIcon>
                              </Avatar>
                            }
                            size="small"
                            label="User"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={() => handleEditUser(user)}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
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
              user={userData}
              title={title}
              messageContent={messageContent}
              handleClose={handleCloseDelete}
              open={openDelete}
            ></DeleteModal>
          )}
        </>
      )}
    </>
  );
};

export default UserListScreen;
