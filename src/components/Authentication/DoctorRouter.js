import React from "react";
import { Route } from "../../Router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const DoctorRouters = ({ component: Component, ...rest }) => {
  const userType = useSelector((state) => state.authentication.user.type);

  return (
    <Route
      {...rest}
      render={(props) =>
        userType === "Doctor" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/doctor" />
        )
      }
    />
  );
};

export default DoctorRouters;
