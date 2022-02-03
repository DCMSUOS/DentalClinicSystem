import React from "react";
import { Route } from "../../Router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.Authentication.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        (user.type === "Admin" && <Redirect to='/admin' />) ||
        (user.type === "Coach" && <Redirect to='/coach' />) ||
        (user.type === "Store" && <Redirect to='/store' />)
      }
    />
  );
};

export default PrivateRouter;
