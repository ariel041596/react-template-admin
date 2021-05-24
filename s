// "@fullcalendar/core": "^5.5.0",
// "@fullcalendar/daygrid": "^5.5.0",
// "@fullcalendar/interaction": "^5.5.0",
// "@fullcalendar/react": "^5.5.0",
// "@fullcalendar/timegrid": "^5.5.0",


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  CardContent,
  Card,
  Button,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  Snackbar,
  Avatar,
  Badge,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import axios from "axios";

// Icons
import MailIcon from "@material-ui/icons/Mail";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import Loading from "../components/Loading";

import { updateUserProfile, getUserDetails } from "../actions/userActions";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Message from "../components/Message";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 25,
  },
  breadcrumbs: {
    marginBottom: 12,
  },
  link: {
    color: "grey",
  },
  updateButton: {
    marginTop: 5,
  },
  avatar: {
    display: "absolute",
    margin: "auto",
    height: 120,
    width: 120,
  },
  field: {
    display: "absolute",
  },
  input: {
    display: "none",
  },
});

const ProfileScreen = ({ history }) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState();
  const [image, setImage] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  // State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading, error } = userUpdateProfile;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: detailsLoading, error: detailsError, user } = userDetails;

  // Methods
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);
    const pass = password;
    const reg = new RegExp("^(?=.*[a-z])(?=.{6,})");
    const testPass = reg.test(pass);
    if (!testPass) {
      setMessage("Password must contain 6 characters");
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          firstName,
          lastName,
          email,
          password,
        })
      );
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  // UseEffect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.firstName || success) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET,
        });
        dispatch(getUserDetails("profile"));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setImage(user.image);
      }
    }
    if (success) {
      setOpen(true);
      setPassword("");
    }
  }, [dispatch, history, userInfo, success, user]);

  return (
    <>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link className={classes.link} to="/">
          Home
        </Link>
        <Typography color="primary">Profile</Typography>
      </Breadcrumbs>
      {error && <Message severity="error">{error}</Message>}
      {message && <Message severity="error">{message}</Message>}
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            variant="h2"
          >
            Profile
          </Typography>
          {detailsLoading && <Loading></Loading>}
          <form onSubmit={submitHandler}>
            <div className={classes.avatar}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <>
                    <input
                      onChange={uploadFileHandler}
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCameraIcon />
                      </IconButton>
                    </label>
                  </>
                }
              >
                <Avatar src={image} className={classes.avatar} />
              </Badge>
              {uploading && <Loading></Loading>}
            </div>
            <TextField
              margin="normal"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              required
              fullWidth
              id="outlined-first-name"
              variant="outlined"
              label="First Name"
              color="primary"
            ></TextField>
            <TextField
              margin="normal"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              required
              fullWidth
              id="outlined-last-name"
              variant="outlined"
              label="Last Name"
              color="primary"
            ></TextField>
            <TextField
              disabled
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              fullWidth
              id="outlined-email"
              variant="outlined"
              label="Email"
              color="primary"
              InputProps={{
                startadornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle email visibility" edge="end">
                      <MailIcon></MailIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={values.showPassword ? "text" : "password"}
              required
              fullWidth
              id="outlined-password"
              variant="outlined"
              color="primary"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            {loading ? (
              <Loading></Loading>
            ) : (
              <Button
                disabled={loading}
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                className={classes.updateButton}
              >
                Update Profile
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="success"
        >
          Success!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileScreen;























import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  CardContent,
  Card,
  Button,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  Snackbar,
  Avatar,
  Badge,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import axios from "axios";

// Icons
import MailIcon from "@material-ui/icons/Mail";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import Loading from "../components/Loading";

import { updateUserProfile } from "../actions/userActions";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Message from "../components/Message";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 25,
  },
  breadcrumbs: {
    marginBottom: 12,
  },
  link: {
    color: "grey",
  },
  updateButton: {
    marginTop: 5,
  },
  avatar: {
    display: "absolute",
    margin: "auto",
    height: 120,
    width: 120,
  },
  field: {
    display: "absolute",
  },
  input: {
    display: "none",
  },
});

const ProfileScreen = ({ history }) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState();
  const [image, setImage] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  // State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, loading, error } = userUpdateProfile;

  // Methods
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);
    const pass = password;
    const reg = new RegExp("^(?=.*[a-z])(?=.{6,})");
    const testPass = reg.test(pass);
    if (!testPass) {
      setMessage("Password must contain 6 characters");
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          firstName,
          lastName,
          email,
          password,
        })
      );
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  // UseEffect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      setImage(userInfo.image);
    }
    dispatch({
      type: USER_UPDATE_PROFILE_RESET,
    });
    if (success) {
      setOpen(true);
      setPassword("");
    }
  }, [dispatch, history, userInfo, success]);

  return (
    <>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
        <Link className={classes.link} to="/">
          Home
        </Link>
        <Typography color="primary">Profile</Typography>
      </Breadcrumbs>
      {error && <Message severity="error">{error}</Message>}
      {message && <Message severity="error">{message}</Message>}
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            variant="h2"
          >
            Profile
          </Typography>
          <form onSubmit={submitHandler}>
            <div className={classes.avatar}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <>
                    <input
                      onChange={uploadFileHandler}
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCameraIcon />
                      </IconButton>
                    </label>
                  </>
                }
              >
                <Avatar src={image} className={classes.avatar} />
              </Badge>
              {uploading && <Loading></Loading>}
            </div>
            <TextField
              margin="normal"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              required
              fullWidth
              id="outlined-first-name"
              variant="outlined"
              label="First Name"
              color="primary"
            ></TextField>
            <TextField
              margin="normal"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              required
              fullWidth
              id="outlined-last-name"
              variant="outlined"
              label="Last Name"
              color="primary"
            ></TextField>
            <TextField
              disabled
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              fullWidth
              id="outlined-email"
              variant="outlined"
              label="Email"
              color="primary"
              InputProps={{
                startadornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle email visibility" edge="end">
                      <MailIcon></MailIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={values.showPassword ? "text" : "password"}
              required
              fullWidth
              id="outlined-password"
              variant="outlined"
              color="primary"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            {loading ? (
              <Loading></Loading>
            ) : (
              <Button
                disabled={loading}
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                className={classes.updateButton}
              >
                Update Profile
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="success"
        >
          Success!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileScreen;

