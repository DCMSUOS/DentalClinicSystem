import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const fetchAllPateints = () => {
  return async (dispatch) => {
    let data = [];
    await firebase
      .firestore()
      .collection("Patients")
      .onSnapshot(async (querysnapshot) => {
        data = querysnapshot.docs.map((doc) => doc.data());
        dispatch({ type: "SET_PATIENTS", data });
      });
  };
};

export const addPatient = (patient) => {
  return async (dispatch) => {
    await firebase
      .firestore()
      .collection("Patients")
      .doc(patient.id)
      .set({ ...patient });
  };
};

export const fetchAllAppointments = () => {
  return async (dispatch) => {
    let data = [];
    await firebase
      .firestore()
      .collection("Appointments")
      .onSnapshot(async (querysnapshot) => {
        data = querysnapshot.docs.map((doc) => doc.data());
        console.log(data);
        dispatch({ type: "SET_APPOINTMENTS", data });
      });
  };
};

export const addAppointment = (appointment) => {
  return async () => {
    try {
      await firebase
        .firestore()
        .collection("Appointments")
        .doc(appointment.id)
        .set({ ...appointment });
    } catch (e) {
      console.log(e);
    }
  };
};
