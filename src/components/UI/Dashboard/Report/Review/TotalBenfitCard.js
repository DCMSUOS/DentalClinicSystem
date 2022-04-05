import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import numeral from "numeral";
import { fontFamily } from "../../../../../assets/FontStyleConfig";

const { height, width } = Dimensions.get("screen");

const TotalBenfitCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          fontSize: 13,
          opacity: 0.5,
        }}
      >
        Total Benefit
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <Index
          value={numeral(data.totalPrice).format("0.00$")}
          desciption="Profit of all requests without offer and discounts"
          label={"Benefit"}
        />
        <Index
          value={numeral(data.totalTrainerBenefit).format("0.00$")}
          desciption="Shop Profit of all requests without offer and discounts"
          label={"Shop Benefit"}
        />
        <Index
          value={numeral(data.totalBullHeadBenefit).format("0.00$")}
          desciption="Profit of all requests without offer and discounts"
          label={"Benefit"}
        />
      </View>
    </View>
  );
};

const Index = ({ label, value, desciption }) => {
  return (
    <View
      style={{
        padding: 20,
        width: "30%",
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          fontSize: 14,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          fontSize: 12,
          opacity: 0.5,
        }}
      >
        {desciption}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          opacity: 1,
          fontSize: 40,
          marginTop: 8,
        }}
      >
        {value || 0}
      </Text>
    </View>
  );
};

export default TotalBenfitCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height / 5.5,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
});
