import React from "react";
import { Route } from "../../Router";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminRouter = ({ component: Component, ...rest }) => {
  const userType = useSelector((state) => state.Authentication.user.type);

  return (
    <Route
      {...rest}
      render={(props) =>
        userType === "Admin" ? (
          <Component t={t} i18n={i18n} {...props} />
        ) : (
          <Redirect to='/admin' />
        )
      }
    />
  );
};

export default AdminRouter;
