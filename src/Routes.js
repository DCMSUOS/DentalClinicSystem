import React from "react";
import { Router, Switch, Route } from "./Router/index";
import { View } from "react-native";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginScreen from "./screens/Authentication/LoginScreen";
import App from "./App";
import Navigation from "./Navigation/Navigation";
import PrivateRouter from "./components/Authentication/PrivateRouter";
import PrivateRouterComponent from "./components/Authentication/PrivateRouterComponent";
import AdminRouters from "./Router/AdminRouters";
import DoctorRouters from "./Router/DoctorsRouters";

export const Routes = (props) => {
  const loading = useSelector((state) => state.authentication.loading);
  const User = useSelector((state) => state.authentication);

  return (
    <Router>
      {!User.isAuthenticate && <Redirect to="/login" />}
      {!User.isAuthenticate && (
        <Route exact path="/login" component={LoginScreen} />
      )}
      {User.isAuthenticate && (
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                width: "30%",
                maxWidth: 240,
                minWidth: 180,
                zIndex: 10,
              }}
            >
              <Navigation />
            </View>

            <View
              style={{
                flex: 1,
                zIndex: 1,
              }}
            >
              <Switch>
                <PrivateRouter
                  exact
                  path="/"
                  component={PrivateRouterComponent}
                />
                {User.user.type === "Admin" && <AdminRouters />}
                {User.user.type === "Doctor" && <DoctorRouters />}
              </Switch>
              <Route
                component={(props) => {
                  return <Redirect to={"/"} />;
                }}
              />
            </View>
          </View>
        </View>
      )}
    </Router>
  );
};
