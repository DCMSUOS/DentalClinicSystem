import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import MainChart from "./MainChart";
import LeftPart from "./LeftPart";

const { height, width } = Dimensions.get("window");

const Upper = ({ detailsData, duration }) => {
  return (
    <View style={styles.container}>
      {detailsData.mainChartData && (
        <MainChart data={detailsData.mainChartData} duration={duration} />
      )}
      {detailsData.totalData && <LeftPart data={detailsData.totalData} />}
    </View>
  );
};

export default Upper;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    /// backgroundColor: "red",
    padding: 10,
    justifyContent: "space-between",
    minHeight: height / 1.8,
  },
});
