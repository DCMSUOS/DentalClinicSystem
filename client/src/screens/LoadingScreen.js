import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "../assets/color/Colors";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: "https://i.ibb.co/DL7NwN9/logo-1.png" }}
        style={{
          height: "30%",
          width: "20%",
          tintColor: Colors.blueColor,
          transform: [{ scale: 1.5 }],
        }}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
