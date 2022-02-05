import React from "react";
import { Route } from "../../Router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const isAuthenticate = useSelector(
    (state) => state.authentication.isAuthenticate
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticate ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRouter;
