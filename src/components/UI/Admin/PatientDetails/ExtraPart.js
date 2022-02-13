import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import moment from "moment";
import { customAlphabet } from "nanoid/async";
import AddAppointment from "./AddAppointment";

const { height, width } = Dimensions.get("window");

const ExtraPart = ({
  selectedExtraType,
  appointmentToView,
  newAppointment,
  onChangeNewAppointmentData,
  patientId,
}) => {
  const [data, setData] = useState([]);

  const setUpData = async () => {};

  useEffect(() => {
    if (selectedExtraType !== -1) setUpData();
  }, [selectedExtraType]);

  if (selectedExtraType === 0 && newAppointment) {
    return (
      <AddAppointment
        data={newAppointment}
        onChangeNewAppointmentData={onChangeNewAppointmentData}
        patientId={patientId}
      />
    );
  }
  if (selectedExtraType === -1) {
    return (
      <AddAppointment
        data={appointmentToView}
        onChangeNewAppointmentData={onChangeNewAppointmentData}
        patientId={patientId}
      />
    );
  }

  return (
    <View
      style={{
        width: "33%",
        backgroundColor: "#fff",
        padding: 5,
        marginVertical: 20,
        borderRadius: 10,
        height: height / 1.7,
      }}
    >
      <Text
        style={{
          margin: 10,
          fontFamily: fontFamily("en"),
          color: "#292929",
          opacity: 0.5,
        }}
      >
        {selectedExtraType === 0 ? "Add Appointment" : "Appointment"}
      </Text>
    </View>
  );
};

export default ExtraPart;

const styles = StyleSheet.create({});
