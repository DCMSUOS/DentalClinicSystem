import React, { useEffect } from "react";
import AdminRouter from "../components/Authentication/AdminRouter";
import AdminScreen from "../screens/Admin/AdminScreen";
import DashboardScreen from "../screens/Admin/DashboardScreen";
import CreateUser from "../screens/Admin/CreateUser";
import MainFeatures from "../screens/Admin/Features/MainFeatures";
import ServicesScreen from "../screens/Admin/Features/ServicesScreen";
import ServideDetailsScreen from "../screens/Admin/Features/ServideDetailsScreen";
import DoctorsScreen from "../screens/Admin/Features/DoctorsScreen";
import PatientsScreen from "../screens/Admin/Patient/PatientsScreen";
import AddPatientScreen from "../screens/Admin/Patient/AddPatientScreen";
import PatientDetailsScreen from "../screens/Admin/Patient/PatientDetailsScreen";

export default function AdminRouters() {
  return (
    <>
      <AdminRouter path="/dashboard" exact component={DashboardScreen} />
      <AdminRouter path="/reports" exact component={DashboardScreen} />
      <AdminRouter path="/createUser" exact component={CreateUser} />
      <AdminRouter path="/features" exact component={MainFeatures} />
      <AdminRouter path="/features/services" exact component={ServicesScreen} />
      <AdminRouter
        path="/features/services/:id"
        exact
        component={ServideDetailsScreen}
      />
      <AdminRouter path="/features/doctors" exact component={DoctorsScreen} />
      <AdminRouter path="/features/admins" exact component={DoctorsScreen} />
      <AdminRouter path="/patients" exact component={PatientsScreen} />
      <AdminRouter
        path="/patients/addPatients"
        exact
        component={AddPatientScreen}
      />
      <AdminRouter
        path="/patients/:id"
        exact
        component={PatientDetailsScreen}
      />
    </>
  );
}
