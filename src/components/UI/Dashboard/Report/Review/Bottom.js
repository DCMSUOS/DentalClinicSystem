import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import TotalBenfitCard from "./TotalBenfitCard";

const { height, width } = Dimensions.get("screen");

const Bottom = ({ detailsData }) => {
  return (
    <View style={styles.container}>
      <TotalBenfitCard data={detailsData.totalPriceData} />
    </View>
  );
};

export default Bottom;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
});
