import React from "react";
import { Router, Switch, Route } from "./Router/index";
import { View } from "react-native";
import { Redirect } from "react-router-dom";
import App from "./App";

export const Routes = (props) => {
  return (
    <Router>
      <Route exact path='/' component={App} />
    </Router>
  );
};
