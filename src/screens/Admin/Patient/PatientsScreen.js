import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../assets/color/Colors";
import { fontFamily, fontSize } from "../../../assets/FontStyleConfig";
import Header from "../../../components/UI/Admin/PatientList/Header";
import PatientList from "../../../components/UI/Admin/PatientList/PatientList";
import { useSelector } from "react-redux";

const { height, width } = Dimensions.get("window");

const PatientsScreen = () => {
  const AllPateints = useSelector((state) => state.patients.patients);

  const [patients, setPatients] = useState(false);

  const setUpData = () => {
    let dt = [];

    dt = AllPateints;

    setPatients(dt);
  };

  useEffect(() => {
    if (AllPateints) setUpData();
  }, [AllPateints]);

  const onPressAddPateint = () => {
    
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBackgroundColor }}>
      {patients && (
        <View style={{ width: "100%" }}>
          <Header patients={patients} onPressAddPateint={onPressAddPateint} />
          <PatientList patients={patients} />
        </View>
      )}
    </View>
  );
};

export default PatientsScreen;

const styles = StyleSheet.create({});
