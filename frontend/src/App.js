import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Header from "./components/Header";

// Screens
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Route path="/" component={HomeScreen} exact></Route>
    </Router>
  );
};

export default App;
