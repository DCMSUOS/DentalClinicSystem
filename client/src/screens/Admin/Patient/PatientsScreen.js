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
  const [searchInput, setSearchInput] = useState("");
  const [patientData, setPatientData] = useState(false);
  const AllPateints = useSelector((state) => state.patients.patients);
  const AllAppointments = useSelector((state) => state.patients.appointments);
  const { type, id } = useSelector((state) => state.authentication.user);

  const [patients, setPatients] = useState(false);

  const setUpData = () => {
    let dt = [];

    AllPateints.forEach((pt) => {
      let findCurrentAppointMents = null;

      if (type === "Admin") {
        findCurrentAppointMents = AllAppointments.filter(
          (a) => a.patientId === pt.id && !a.isDeleted
        );
      } else {
        findCurrentAppointMents = AllAppointments.filter(
          (a) => a.patientId === pt.id && a.doctorId === id && !a.isDeleted
        );
      }

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

      if (findCurrentAppointMents.length > 0 || type === "Admin")
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
    }

    dt.reverse();
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
    setPatientData(dt);
  };

  const onChangeSortType = (val) => {
    setSortType(val);
  };

  const onSearch = () => {
    let arrData = [];

    if (sortType.type === 1) {
      arrData = patientData.filter((pt) => {
        let phoneNumber = pt.patient.phoneNumber;

        return phoneNumber.indexOf(searchInput) !== -1;
      });
    } else
      arrData = patientData.filter((pt) => {
        let name = pt.patient.firstname + " " + pt.patient.lastname;

        return name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1;
      });

    setPatients(arrData);
  };

  useEffect(() => {
    if (patientData && patients) onSearch();
  }, [searchInput]);

  useEffect(() => {
    if (AllPateints && AllAppointments) setUpData();
  }, [AllPateints, AllAppointments, sortType]);

  const history = useHistory();

  const onPressAddPateint = () => {
    history.push(`patients/addPatients`);
  };

  const onChangeSearchInput = (val) => {
    setSearchInput(val);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBackgroundColor }}>
      {patients && (
        <View style={{ width: "100%" }}>
          <Header
            sortType={sortType}
            searchInput={searchInput}
            patients={patients}
            onPressAddPateint={onPressAddPateint}
            onChangeSearchInput={onChangeSearchInput}
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
