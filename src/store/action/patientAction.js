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
