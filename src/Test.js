import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Test = ({}) => {
 
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text onPress={onPressAddBtn}>tets11</Text>
      <Comp1 />
    </View>
  );
};

const Comp1 = () => {
  return (
    <View style={{ backgroundColor: "green" }}>
      <Text>slaw</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
