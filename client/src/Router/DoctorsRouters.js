import React, { useEffect } from "react";
import DoctorRouter from "../components/Authentication/DoctorRouter";
import DoctorScreen from "../screens/Doctor/DoctorScreen";

export default function DoctorRouters() {
  return (
    <>
      <DoctorRouter path="/doctor" exact component={DoctorScreen} />
    </>
  );
}
