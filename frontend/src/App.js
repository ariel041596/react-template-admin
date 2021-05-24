import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Layout from "./components/Layout";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserListScreen from "./screens/UserListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./screens/NotFound";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/profile" component={ProfileScreen}></Route>
          <Route path="/admin/users" component={UserListScreen}></Route>
          <Route exact component={NotFound}></Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
