import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../assets/color/Colors";
import Upper from "../../../components/UI/Admin/PatientDetails/Upper";
import Schedule from "../../../components/UI/Admin/PatientDetails/Schedule";
import { customAlphabet } from "nanoid/async";
import moment from "moment";
import Modal from "modal-enhanced-react-native-web";
import SelectDoctorsModal from "../../../components/UI/Admin/PatientDetails/SelectDoctorsModal";
import SelectServiceModal from "../../../components/UI/Admin/PatientDetails/SelectServiceModal";

// const ExtraPart = [
//   { label: "Adding Appointment", type: 0 },
//   { label: "Viewing Appointment", type: 1 },
// ];

const PatientDetailsScreen = (props) => {
  const [currentPatient, setCurrentPatient] = useState(false);
  const [currentAppointments, setCurrentAppointments] = useState(false);
  const [appointmentToView, setAppointmentToView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctorsModalIsOn, setDoctorsModalIsOn] = useState(false);
  const [serviceModalIsOn, setServiceModalIsOn] = useState(false);

  const [selectedExtraType, setSelectedExtraType] = useState(-1);
  const [newAppointment, setNewAppointment] = useState(false);

  const id = props.match.params.id;
  const AllPateints = useSelector((state) => state.patients);
  const doctors = useSelector((state) => state.features.admins);
  const services = useSelector((state) => state.features.services);

  const setUpCurrentPatient = () => {
    let findCurrentPatient = AllPateints.patients.find((a) => a.id === id);
    let findCurrentAppointMents = AllPateints.appointments.filter(
      (a) => a.patientId === id
    );

    setCurrentPatient(findCurrentPatient);
    if (!findCurrentAppointMents) {
      findCurrentAppointMents = [];
    }
    setCurrentAppointments(() => [...findCurrentAppointMents]);
  };

  const onPressAddAppointment = () => {
    onChangeSelectedExtraType(0);
  };

  const onViwingAppointment = (id) => {
    if (id) {
      onChangeSelectedExtraType(1);
      let curr = currentAppointments.find((a) => a.id === id);
      setAppointmentToView(curr);
    } else {
      setSelectedExtraType(-1);
      setAppointmentToView(false);
    }
  };

  useEffect(() => {
    if (AllPateints && AllPateints.appointments && AllPateints.patients)
      setUpCurrentPatient();
  }, [AllPateints, id, AllPateints.appointments]);

  const onChangeSelectedExtraType = (val) => {
    setSelectedExtraType(val);
  };

  const setUpNewAppointment = async () => {
    const nanoid = customAlphabet("1234567890", 4);
    let id = await nanoid();

    let dt = {
      doctorId: "oh2brPypbRNE1nPXef1KTrkMYkD2",
      date: moment().valueOf(),
      services: [services[0]],
      numberId: id,
    };

    setNewAppointment(dt);
  };

  const toggleUpDoctorsModal = () => {
    setDoctorsModalIsOn(!doctorsModalIsOn);
  };

  const toggleServiceModal = () => {
    setServiceModalIsOn(!serviceModalIsOn);
  };

  const onChangeNewAppointmentData = (type, val) => {
    let dt = newAppointment;

    if (type === 0) {
      dt.date = val;
    }
    if (type === 1) {
      dt.note = val;
    }
    if (type === 2) {
      dt.doctorId = val;
    }
    if (type === 3) {
      let check = dt.services.find((a) => a.id === val.id);
      let serArr = dt.services || [];

      if (!check) {
        serArr.push(val);
      } else {
        serArr = [];
        dt.services.forEach((sv) => {
          if (sv.id !== val.id) {
            serArr.push(sv);
          }
        });
      }
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
    if (type === 2) {
      dt.doctorId = val;
    }
    if (type === 3) {
      let check = dt.services.find((a) => a.id === val.id);
      let serArr = dt.services || [];

      if (!check) {
        serArr.push(val);
      } else {
        if (serArr.length === 1) {
          return;
        }
        serArr = [];
        dt.services.forEach((sv) => {
          if (sv.id !== val.id) {
            serArr.push(sv);
          }
        });
      }

      dt.services = serArr;
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
      {currentPatient && currentAppointments && doctors && services && (
        <View style={{ width: "100%", padding: 20, marginBottom: 50 }}>
          {selectedExtraType !== -1 && (
            <Modal isVisible={doctorsModalIsOn}>
              <SelectDoctorsModal
                doctors={doctors}
                selectedExtraType={selectedExtraType}
                newAppointment={newAppointment}
                appointmentToView={appointmentToView}
                onChangeNewAppointmentData={onChangeNewAppointmentData}
                onChangeAppointmentData={onChangeAppointmentData}
                toggleUpDoctorsModal={toggleUpDoctorsModal}
              />
            </Modal>
          )}

          {selectedExtraType !== -1 && (
            <Modal isVisible={serviceModalIsOn}>
              <SelectServiceModal
                services={services}
                selectedExtraType={selectedExtraType}
                newAppointment={newAppointment}
                appointmentToView={appointmentToView}
                onChangeNewAppointmentData={onChangeNewAppointmentData}
                onChangeAppointmentData={onChangeAppointmentData}
                toggleServiceModal={toggleServiceModal}
              />
            </Modal>
          )}
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
            doctors={doctors}
            loading={loading}
            changeLoading={changeLoading}
            toggleUpDoctorsModal={toggleUpDoctorsModal}
            toggleServiceModal={toggleServiceModal}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default PatientDetailsScreen;

const styles = StyleSheet.create({});
