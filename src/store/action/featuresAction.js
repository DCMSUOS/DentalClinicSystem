import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const fetchAllServices = () => {
  return async (dispatch) => {
    let data = [];

    await firebase
      .firestore()
      .collection("Services")
      .onSnapshot(async (querysnapshot) => {
        data = querysnapshot.docs.map((doc) => doc.data());
        dispatch({ type: "SET_SERVICES", data });
      });
  };
};

export const setService = (data) => {
  return async () => {
    await firebase
      .firestore()
      .collection("Services")
      .doc(data.id)
      .set({ ...data });
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch) => {
    let data = [];

    await firebase
      .firestore()
      .collection("Admins")
      .onSnapshot(async (querysnapshot) => {
        data = querysnapshot.docs.map((doc) => doc.data());
        dispatch({ type: "SET_ADMINS", data });
      });
  };
};
