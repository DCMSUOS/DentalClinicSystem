import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../assets/color/Colors";
import { fontFamily, fontSize } from "../../../assets/FontStyleConfig";
import Header from "../../../components/UI/Admin/PatientList/Header";
import PatientList, {
  headerLabel,
} from "../../../components/UI/Admin/PatientList/PatientList";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

const { height, width } = Dimensions.get("window");

const PatientsScreen = () => {
  const [sortType, setSortType] = useState(headerLabel[0]);
  const AllPateints = useSelector((state) => state.patients.patients);
  const AllAppointments = useSelector((state) => state.patients.appointments);

  const [patients, setPatients] = useState(false);

  const setUpData = () => {
    let dt = [];

    AllPateints.forEach((pt) => {
      let findCurrentAppointMents = AllAppointments.filter(
        (a) => a.patientId === pt.id
      );
      findCurrentAppointMents.sort((a, b) => a.date - b.date);

      let lastAppointment = findCurrentAppointMents.filter(
        (a) => a.sitType == 2
      );
      lastAppointment.sort((a, b) => a.date - b.data);
      lastAppointment.reverse();
      let nextAppointment = findCurrentAppointMents.filter(
        (a) =>
          (a.sitType == 0 || a.sitType == 1 || a.sitType == 2) &&
          a.date > moment().valueOf()
      );
      nextAppointment.sort((a, b) => a.date - b.data);
      dt.push({
        patient: pt,
        appointments: findCurrentAppointMents,
        nextAppointment,
        lastAppointment,
      });
    });

    if (sortType.type === 0) {
      dt.sort((a, b) => {
        if (a.patient.firstname < b.patient.firstname) {
          return -1;
        }
        if (a.patient.firstname > b.patient.firstname) {
          return 1;
        }
        return 0;
      });
    }
    if (sortType.type === 1) {
      dt.sort(
        (a, b) => Number(a.patient.phoneNumber) - Number(b.patient.phoneNumber)
      );
    }
    if (sortType.type === 2) {
      dt.sort(
        (a, b) =>
          Number(a.nextAppointment[0]?.date) ||
          0 - Number(b.nextAppointment[0]?.date) ||
          0
      );

      dt.reverse();
    }
    if (sortType.type === 3) {
      dt.sort(
        (a, b) =>
          Number(a.lastAppointment[0]?.date) ||
          0 - Number(b.lastAppointment[0]?.date) ||
          0
      );
      dt.reverse();
    }
    if (sortType.type === 4) {
      dt.sort((a, b) => a.patient.createdAt - b.patient.createdAt);
      dt.reverse();
    }

    setPatients(dt);
  };

  const onChangeSortType = (val) => {
    setSortType(val);
  };

  useEffect(() => {
    if (AllPateints && AllAppointments) setUpData();
  }, [AllPateints, AllAppointments, sortType]);

  const history = useHistory();

  const onPressAddPateint = () => {
    history.push(`patients/addPatients`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBackgroundColor }}>
      {patients && (
        <View style={{ width: "100%" }}>
          <Header
            sortType={sortType}
            patients={patients}
            onPressAddPateint={onPressAddPateint}
          />
          <PatientList
            onChangeSortType={onChangeSortType}
            patients={patients}
            sortType={sortType}
          />
        </View>
      )}
    </View>
  );
};

export default PatientsScreen;

const styles = StyleSheet.create({});
