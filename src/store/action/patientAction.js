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


export const updateDuration = (type, value) => {
  return (dispatch, getState) => {
    let obj = getState().patients.duration;

    if (type === 0) {
      obj.startDate = value;

      if (obj.startDate > obj.endDate) {
        obj.endDate = value;
      }
    } else if (type === 1) {
      obj.endDate = value;

      if (obj.endDate < obj.startDate) {
        obj.startDate = value;
      }
    } else if (type === 2) {
      obj = value;
    }

    dispatch({
      type: "UPDATE_DURATION",
      data: { ...obj },
    });
  };
};