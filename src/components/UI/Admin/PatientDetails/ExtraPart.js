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
  onChangeAppointmentData,
  patientId,
  onViwingAppointment,
  loading,
  changeLoading,
}) => {
  if (selectedExtraType !== -1)
    return (
      <AddAppointment
        data={selectedExtraType === 0 ? newAppointment : appointmentToView}
        onChangeNewAppointmentData={onChangeNewAppointmentData}
        onChangeAppointmentData={onChangeAppointmentData}
        selectedExtraType={selectedExtraType}
        patientId={patientId}
        onViwingAppointment={onViwingAppointment}
        loading={loading}
        changeLoading={changeLoading}
      />
    );

  return (
    <View
      style={{
        width: "33%",
        backgroundColor: "#fff",
        padding: 5,
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: height / 1.7,
      }}
    >
      <Text style={{ fontFamily: fontFamily("en"), opacity: 0.5 }}>
        Select Appointment To View Details
      </Text>
    </View>
  );
};

export default ExtraPart;

const styles = StyleSheet.create({});
