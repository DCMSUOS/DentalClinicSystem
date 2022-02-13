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

const { width, height } = Dimensions.get("window");

const headerLabel = [
  { label: "Basic Info" }, //1
  { label: "Phone Number" }, //2
  { label: "Next Appointment" }, //3
  { label: "Last Appointment" }, //4
  { label: "Register Date" }, //5
];

const PatientList = ({ patients }) => {
  return (
    <View style={{ width: "100%", marginTop: 30 }}>
      <RenderHeaderLable />
      <RenderPatient patients={patients} />
    </View>
  );
};

const RenderPatient = ({ patients }) => {
  return (
    <ScrollView style={{ width: "100%", marginTop: 20, height: height / 1.6 }}>
      {patients.map((patient, i) => {
        return <Patient patient={patient} key={i} />;
      })}
    </ScrollView>
  );
};

const Patient = ({ patient }) => {
  const [data, setData] = useState(false);

  const setUpData = () => {
    let d = [];

    //1
    d.push({ label: patient.firstname });

    //2
    d.push({ label: `(964) ${patient.phoneNumber}` });

    //3
    d.push({ label: moment().subtract(10, "day").format("llll") });

    //4
    d.push({ label: moment().add(10, "day").format("ll") });

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

const RenderHeaderLable = () => {
  return (
    <View style={styles.headerLabelContainer}>
      {headerLabel.map((lb, i) => {
        return (
          <View key={i} style={{ width: width / 1.1 / headerLabel.length }}>
            <Text
              style={{
                fontFamily: fontFamily("en", "Montserrat-Bold"),
                color: "#292929",
                opacity: 0.5,
              }}
            >
              {lb.label}
            </Text>
          </View>
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
