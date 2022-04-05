import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

import moment from "moment";
import { fontFamily } from "../../../../../assets/FontStyleConfig";

ChartJS.register(...registerables);

const { height, width } = Dimensions.get("window");

const MainChart = ({ data, duration }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", padding: 20 }}>
        <Text
          style={{
            fontFamily: fontFamily("en", "Montserrat-Bold"),
            color: "#292929",
            fontSize: 25,
          }}
        >
          Appointments{", "}
          <Text
            style={{
              fontFamily: fontFamily("en", "Montserrat-Medium"),
              opacity: 0.8,
            }}
          >
            {moment(duration.startDate).format("DD-MM-YYYY")}
            {" - "}
            {moment(duration.endDate).format("DD-MM-YYYY")}.
          </Text>
        </Text>
      </View>
      <Bar
        data={data}
        width={150}
        height={70}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontFamily: "Montserrat-Regular",
                  backdropColor: "red",
                },
              },
            ],
          },
          title: {
            display: true,
            text: "Orders",
            fontFamily: "Montserrat-Light",
            fontSize: 20,
          },
          legend: {
            labels: {
              fontFamily: "Montserrat-Regular",
            },
          },
        }}
      />
    </View>
  );
};

export default MainChart;

const styles = StyleSheet.create({
  container: {
    width: "59%",
    backgroundColor: "#fff",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
});
