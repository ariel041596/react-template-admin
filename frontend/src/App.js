import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Layout from "./components/Layout";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
      </Layout>
    </Router>
  );
};

export default App;
