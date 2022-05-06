import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const LOGIN = (userData) => {
  return async (dispatch) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password);

      let uid = response.user.uid;
      let data = await returnUserData(uid);

      dispatch({
        type: "LOGIN",
        data: data,
      });
    } catch (e) {
      throw e;
    }
  };
};

export const LOGOUT = () => {
  return async (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};

const returnUserData = async (uid) => {
  try {
    let data = undefined;
    await firebase
      .firestore()
      .collection("Admins")
      .doc(uid)
      .get()
      .then((d) => {
        data = d.data();
      });

    return data;
  } catch (e) {
    throw e;
  }
};

export const startGetUserData = (uid) => {
  return async (dispatch) => {
    let data = await returnUserData(uid);
    try {
      dispatch({
        type: "LOGIN",
        data: data,
      });
    } catch (e) {}
  };
};

export const createUser = (userData) => {
  return async () => {
    let response = await firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password);

  };
};
