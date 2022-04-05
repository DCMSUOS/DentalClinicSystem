import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { fontFamily } from "../../../../../assets/FontStyleConfig";
import Colors from "../../../../../assets/color/Colors";

const ViewTotalDataContainer = ({ data, onPressViewAllOrder }) => {
  return (
    <View
      style={{
        width: "98.5%",
        height: 50,
        backgroundColor: "#fff",
        alignSelf: "center",
        marginVertical: 8,
        borderRadius: 5,
        justifyContent: "space-between",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          fontSize: 13,
          opacity: 0.5,
        }}
      >
        View All Order ({data.length})
      </Text>
      <TouchableOpacity
        onPress={onPressViewAllOrder}
        activeOpacity={0.5}
        style={{
          backgroundColor: "rgba(29,29,29,0.07)",
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 2,
        }}
      >
        <Text
          style={{ fontFamily: fontFamily("en"), color: Colors.CryptoColor }}
        >
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewTotalDataContainer;

const styles = StyleSheet.create({});
