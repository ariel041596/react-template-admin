import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserListScreen from "./screens/UserListScreen";

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/admin/users" component={UserListScreen}></Route>
      </Layout>
    </Router>
  );
};

export default App;
