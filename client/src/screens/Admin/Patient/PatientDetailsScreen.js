import { StyleSheet, Text, View, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../assets/color/Colors";
import Upper from "../../../components/UI/Admin/PatientDetails/Upper";
import Schedule from "../../../components/UI/Admin/PatientDetails/Schedule";
import { customAlphabet } from "nanoid/async";
import moment from "moment";

const ExtraPart = [
  { label: "Adding Appointment", type: 0 },
  { label: "Viewing Appointment", type: 1 },
];

const PatientDetailsScreen = (props) => {
  const [currentPatient, setCurrentPatient] = useState(false);
  const [currentAppointments, setCurrentAppointments] = useState(false);
  const [appointmentToView, setAppointmentToView] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedExtraType, setSelectedExtraType] = useState(-1);
  const [newAppointment, setNewAppointment] = useState(false);

  const id = props.match.params.id;
  const AllPateints = useSelector((state) => state.patients);

  const setUpCurrentPatient = () => {
    let findCurrentPatient = AllPateints.patients.find((a) => a.id === id);
    let findCurrentAppointMents = AllPateints.appointments.filter(
      (a) => a.patientId === id
    );

    setCurrentPatient(findCurrentPatient);
    if (!findCurrentAppointMents) {
      findCurrentAppointMents = [];
    }
    setCurrentAppointments(findCurrentAppointMents);
  };

  const onPressAddAppointment = () => {
    onChangeSelectedExtraType(0);
  };

  const onViwingAppointment = (id) => {
    onChangeSelectedExtraType(1);
    let curr = currentAppointments.find((a) => a.id === id);
    setAppointmentToView(curr);
  };

  useEffect(() => {
    if (AllPateints && AllPateints.appointments && AllPateints.patients)
      setUpCurrentPatient();
  }, [AllPateints, id]);

  const onChangeSelectedExtraType = (val) => {
    setSelectedExtraType(val);
  };

  const setUpNewAppointment = async () => {
    const nanoid = customAlphabet("1234567890", 4);
    let id = await nanoid();

    let dt = {
      doctorId: "oh2brPypbRNE1nPXef1KTrkMYkD2",
      date: moment().valueOf(),
      setvice: [],
      numberId: id,
    };

    setNewAppointment(dt);
  };

  const onChangeNewAppointmentData = (type, val) => {
    let dt = newAppointment;

    if (type === 0) {
      dt.date = val;
    }
    if (type === 1) {
      dt.note = val;
    }

    setNewAppointment({ ...dt });
  };

  const onChangeAppointmentData = (type, val) => {
    let dt = { ...appointmentToView };

    if (type === 0) {
      dt.date = moment(val).valueOf();
      if (dt.sitType === 3) {
        dt.sitType = 0;
      }
    }
    if (type === 1) {
      dt.note = val;
    }

    setAppointmentToView(dt);
  };

  const changeLoading = (val) => {
    setLoading(val);
  };

  useEffect(() => {
    if (!newAppointment) setUpNewAppointment();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.lightBackgroundColor }}
    >
      {currentPatient && currentAppointments && (
        <View style={{ width: "100%", padding: 20, marginBottom: 50 }}>
          <Upper
            currentPatient={currentPatient}
            appointmentToView={appointmentToView}
            currentAppointments={currentAppointments}
            newAppointment={newAppointment}
            selectedExtraType={selectedExtraType}
            onChangeNewAppointmentData={onChangeNewAppointmentData}
            onChangeAppointmentData={onChangeAppointmentData}
          />
          <Schedule
            currentPatient={currentPatient}
            selectedExtraType={selectedExtraType}
            currentAppointments={currentAppointments}
            onPressAddAppointment={onPressAddAppointment}
            onViwingAppointment={onViwingAppointment}
            appointmentToView={appointmentToView}
            newAppointment={newAppointment}
            onChangeNewAppointmentData={onChangeNewAppointmentData}
            onChangeAppointmentData={onChangeAppointmentData}
            patientId={id}
            loading={loading}
            changeLoading={changeLoading}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default PatientDetailsScreen;

const styles = StyleSheet.create({});
