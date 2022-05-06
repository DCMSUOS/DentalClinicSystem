import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

export const headerLabel = [
  { label: "Basic Info", type: 0 }, //1
  { label: "Phone Number", type: 1 }, //2
  { label: "Next Appointment", type: 2 }, //3
  { label: "Last Appointment", type: 3 }, //4
  { label: "Register Date", type: 4 }, //5
];

const PatientList = ({ patients, onChangeSortType, sortType }) => {
  return (
    <View style={{ width: "100%", marginTop: 30 }}>
      <RenderHeaderLable
        onChangeSortType={onChangeSortType}
        sortType={sortType}
      />
      <RenderPatient patients={patients} />
    </View>
  );
};

const RenderPatient = ({ patients }) => {
  const [patientsData, setPatientsData] = useState(false);

  const setUpData = () => {
    let dt = patients;

    setPatientsData(dt);
  };

  useEffect(() => {
    if (patients) {
      setUpData();
    }
  }, [patients]);

  return (
    <ScrollView style={{ width: "100%", marginTop: 20, height: height / 1.6 }}>
      {patientsData &&
        patientsData.map((dt, i) => {
          return (
            <Patient
              patient={dt.patient}
              key={i}
              appointments={dt.appointments}
            />
          );
        })}
    </ScrollView>
  );
};

const Patient = ({ patient, appointments }) => {
  const [data, setData] = useState(false);

  const setUpData = () => {
    let d = [];

    let lastAppointment = appointments.filter((a) => a.sitType == 2);
    lastAppointment.sort((a, b) => a.date - b.data);
    lastAppointment.reverse();

    let nextAppointment = appointments.filter(
      (a) => a.sitType == 0 || a.sitType == 1
    );
    nextAppointment.sort((a, b) => a.date - b.data);

    //1
    d.push({ label: patient.firstname });

    //2
    d.push({ label: `(964) ${patient.phoneNumber}` });

    //3
    d.push({
      label: nextAppointment[0]
        ? moment(nextAppointment[0].date).format("llll")
        : "Invalid",
    });

    //4
    d.push({
      label: lastAppointment[0]
        ? moment(lastAppointment[0].date).format("ll")
        : "Invalid",
    });

    //5
    d.push({
      label: moment(patient.createdAt).format("ll"),
    });

    setData(d);
  };

  const history = useHistory();

  const OnPressPateintItem = () => {
    history.push(window.location.pathname + `/${patient.id}`);
  };

  useEffect(() => {
    if (patient) {
      setUpData();
    }
  }, [patient]);

  return (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={OnPressPateintItem}
      activeOpacity={0.6}
    >
      {data &&
        data.map((d, i) => {
          return (
            <View key={i} style={{ width: width / 1.1 / headerLabel.length }}>
              <Text
                style={{
                  fontFamily: fontFamily("en", "Montserrat-Regular"),
                  color: "#292929",
                  opacity: 0.8,
                  fontSize: 13,
                }}
              >
                {d.label}
              </Text>
            </View>
          );
        })}
    </TouchableOpacity>
  );
};

const RenderHeaderLable = ({ onChangeSortType, sortType }) => {
  const onChange = (val) => {
    onChangeSortType(val);
  };
  return (
    <View style={styles.headerLabelContainer}>
      {headerLabel.map((lb, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={{ width: width / 1.1 / headerLabel.length }}
            onPress={onChange.bind(this, lb)}
          >
            <Text
              style={{
                fontFamily: fontFamily("en", "Montserrat-Bold"),
                color: "#292929",
                opacity: sortType.type === lb.type ? 1 : 0.5,
              }}
            >
              {lb.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PatientList;

const styles = StyleSheet.create({
  patientItem: {
    width: "95%",
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 10,
    alignSelf: "center",
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignSelf: "center",
  },
});
