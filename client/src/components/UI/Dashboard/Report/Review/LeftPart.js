import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontFamily } from "../../../../../assets/FontStyleConfig";

const LeftPart = ({ data }) => {
  return (
    <View
      style={{
        width: "40%",
        backgroundColor: "#fff",
     //   height: "100%",
        padding: 20,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          fontSize: 13,
          opacity: 0.5,
        }}
      >
        Amount Of Order
      </Text>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          height: "100%",
        }}
      >
        {data &&
          data.map((dt, i) => {
            return (
              <Index
                key={i}
                label={dt.label}
                value={dt.value}
                desciption={dt.desciption}
              />
            );
          })}
      </View>
    </View>
  );
};

const Index = ({ label, value, desciption }) => {
  return (
    <View
      style={{
        padding: 20,
        width: "45%",
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          fontSize: 16,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          fontSize: 10,
          opacity: 0.5,
        }}
      >
        {desciption}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          opacity: 0.6,
          fontSize: 65,
        }}
      >
        {value || 0}
      </Text>
    </View>
  );
};

export default LeftPart;

const styles = StyleSheet.create({});
