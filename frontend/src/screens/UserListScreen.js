import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AddIcon from "@material-ui/icons/Add";

import Loading from "../components/Loading";
import Message from "../components/Message";

import { getUserList, deleteUser } from "../actions/userActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserListScreen = ({ history }) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();

  // State
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList());
      console.log(users);
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Message severity="error"></Message>
      ) : (
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
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserListScreen;
