import React from "react";
import { Route } from "../../Router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const AdminRouter = ({ component: Component, ...rest }) => {
  const userType = useSelector((state) => state.authentication.user.type);

  return (
    <Route
      {...rest}
      render={(props) =>
        userType === "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin" />
        )
      }
    />
  );
};

export default AdminRouter;
