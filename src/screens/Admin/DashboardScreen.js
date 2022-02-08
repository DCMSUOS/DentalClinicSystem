import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  fetchAllDoctors,
  fetchAllServices,
} from "../../store/action/featuresAction";
import { useDispatch } from "react-redux";
import { fetchAllPateints } from "../../store/action/patientAction";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const setUp = async () => {
    try {
      await dispatch(fetchAllServices());
      await dispatch(fetchAllDoctors());
      await dispatch(fetchAllPateints());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUp();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
