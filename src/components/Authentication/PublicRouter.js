import React from "react";
import { Route } from "../../Router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PrivateRouter = ({component:Component,...rest,history}) => {
  const userType = useSelector(
    (state) => state.Authentication.user.type
  );
  return (
    <Route
    {...rest}
      render={(props) =>
         <Redirect to='/coach' />
      }
    />
  );
};

export default PrivateRouter;