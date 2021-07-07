import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { NotificationsActive } from "@material-ui/icons";

import { Link, useLocation } from "react-router-dom";

import { logoutUser } from "../actions/userActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title2: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
  },
  title: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0",
    },
  },
  grow: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    minHeight: 60,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    background: "#3F51B5",
    color: "white",
    "&:hover": {
      background: "#3F51B5",
    },
  },
  notActive: {
    background: "red",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  logoHeader: {
    width: "auto",
    height: "auto",
    margin: "0 auto",
    padding: "10px",
    position: "relative",
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function Layout({ location, history, children, ...props }) {
  // Variables
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const locationActive = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();

  // State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Methods
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const routes = [
    {
      to: "/",
      text: "Home",
      icon: <MailIcon></MailIcon>,
    },
    {
      to: "/admin/users",
      text: "Users",
      icon: <GroupIcon></GroupIcon>,
    },
    {
      to: "/profile",
      text: "Profile",
      icon: <AccountCircleIcon></AccountCircleIcon>,
    },
  ];
  const routesNotAdmin = [
    {
      to: "/",
      text: "Home",
      icon: <MailIcon></MailIcon>,
    },
    {
      to: "/profile",
      text: "Profile",
      icon: <AccountCircleIcon></AccountCircleIcon>,
    },
  ];

  const drawer = (
    <div>
      <div className={classes.logoHeader}>
        <Avatar className={classes.large} alt="" src="/logo.png"></Avatar>
        <h3>React Template</h3>
      </div>
      <div />

      <Divider />
      {!userInfo || !userInfo.isAdmin ? (
        <List>
          {routesNotAdmin.map((route, index) => (
            <ListItem
              className={
                locationActive.pathname === route.to ? classes.active : null
              }
              button
              key={route.to}
              component={Link}
              to={route.to}
            >
              <ListItemIcon
                className={
                  locationActive.pathname === route.to ? classes.active : null
                }
              >
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.text} />
            </ListItem>
          ))}
          <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
              <PowerSettingsNewIcon></PowerSettingsNewIcon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <List>
          {routes.map((route, index) => (
            <ListItem
              className={
                locationActive.pathname === route.to ? classes.active : null
              }
              button
              key={route.to}
              component={Link}
              to={route.to}
            >
              <ListItemIcon
                className={
                  locationActive.pathname === route.to ? classes.active : null
                }
              >
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.text} />
            </ListItem>
          ))}
          <ListItem button onClick={logoutHandler}>
            <ListItemIcon>
              <PowerSettingsNewIcon></PowerSettingsNewIcon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            {userInfo && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              component={Link}
              to="/"
              className={!userInfo ? classes.title : classes.title2}
              variant="h6"
              noWrap
            >
              React Admin
            </Typography>
            <div className={classes.grow} />

            {!userInfo ? (
              <Button
                component={Link}
                to="/login"
                color="inherit"
                startIcon={<PersonIcon />}
              >
                Sign in
              </Button>
            ) : (
              <IconButton color="inherit" aria-label="notification">
                <NotificationsActive />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        {userInfo && (
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        )}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      {!userInfo && (
        <div className="footer">
          <AppBar elevation={0} position="static" color="inherit">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                &copy; {new Date().getFullYear()}, Made with{" "}
                <svg
                  viewBox="0 0 1792 1792"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "0.8rem" }}
                >
                  <path
                    d="M896 1664q-26 0-44-18l-624-602q-10-8-27.5-26T145 952.5 77 855 23.5 734 0 596q0-220 127-344t351-124q62 0 126.5 21.5t120 58T820 276t76 68q36-36 76-68t95.5-68.5 120-58T1314 128q224 0 351 124t127 344q0 221-229 450l-623 600q-18 18-44 18z"
                    fill="#e25555"
                  ></path>
                </svg>{" "}
                by Ariel
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;
