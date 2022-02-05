import React, { useEffect } from "react";
import AdminRouter from "../components/Authentication/AdminRouter";
import AdminScreen from "../screens/Admin/AdminScreen";
import CreateUser from "../screens/Admin/CreateUser";

export default function AdminRouters() {
  return (
    <>
      <AdminRouter path='/admin' exact component={AdminScreen} />
      <AdminRouter path='/createUser' exact component={CreateUser} />
    </>
  );
}
