import React, { useEffect } from "react";
import AdminRouter from "../components/Authentication/AdminRouter";
import AdminScreen from "../screens/AdminScreen";

export default function AdminRouters() {
  return (
    <>
      <AdminRouter path='/admin' exact component={AdminScreen} />
    </>
  );
}
