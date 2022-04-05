import React from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import { Routes } from "./Routes";
import "./App.css";

import firebase from "./db/firebase";

import authenticationReducer from "./store/reducer/authenticationReducer";
import featuresReducer from "./store/reducer/featuresReducer";
import patientReducer from "./store/reducer/patientReducer";

import { LOGOUT, startGetUserData } from "./store/action/authenticationAction";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const appReducer = combineReducers({
  authentication: authenticationReducer,
  features: featuresReducer,
  patients: patientReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

let App = () => {
  return (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  </Provider>
  );
};

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await store.dispatch(startGetUserData(user.uid));
  } else {
    store.dispatch(LOGOUT());
  }
});
export default App;
