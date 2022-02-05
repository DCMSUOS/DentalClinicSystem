import React from "react";
import { Route } from "../../Router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.authentication.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        (user.type === "Admin" && <Redirect to="/admin" />) ||
        (user.type === "Doctor" && <Redirect to="/doctor" />)
      }
    />
  );
};

export default PrivateRouter;
