import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { fontFamily, fontSize } from "../../../../assets/FontStyleConfig";
import Colors from "../../../../assets/color/Colors";

const { height, width } = Dimensions.get("window");

const Header = ({ patients, onPressAddPateint, sortType }) => {
  return (
    <View>
      <Upper onPressAddPateint={onPressAddPateint} sortType={sortType} />
      <Bottom patients={patients} sortType={sortType} />
    </View>
  );
};

const Upper = ({ onPressAddPateint }) => {
  return (
    <View style={styles.container}>
      <HeaderLabel />
      <UpperRightContainer onPressAddPateint={onPressAddPateint} />
    </View>
  );
};

const HeaderLabel = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Regular"),
          color: "#292929",
          fontSize: fontSize("en", 23),
        }}
      >
        Patient List
      </Text>
    </View>
  );
};

const UpperRightContainer = ({ onPressAddPateint }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", width: "20%" }}>
      <Search />
      <AddButtons onPressAddPateint={onPressAddPateint} />
    </View>
  );
};

const Search = () => {
  return (
    <View>
      <TextInput
        style={{
          width: "90%",
          height: 40,
          borderRadius: 40,
          borderWidth: 0.5,
          borderColor: "rgba(29,29,29,0.2)",
          paddingHorizontal: 20,
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          color: "#292929",
          fontSize: fontSize("en", 13),
        }}
        placeholder="Search"
      />
    </View>
  );
};

const AddButtons = ({ onPressAddPateint }) => {
  return (
    <TouchableOpacity
      onPress={onPressAddPateint}
      style={styles.addBtn}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Light"),
          color: "#fff",
          fontSize: fontSize("en", 35),
        }}
      >
        +
      </Text>
    </TouchableOpacity>
  );
};

const Bottom = ({ patients, sortType }) => {
  return (
    <View style={styles.container}>
      <Counter length={patients.length} />
      <Filter sortType={sortType} />
    </View>
  );
};

const Counter = ({ length }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          fontSize: 35,
          color: Colors.blueColor,
        }}
      >
        {length}{" "}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          fontSize: 13,
          color: "#292929",
          opacity: 0.6,
        }}
      >
        Patients
      </Text>
    </View>
  );
};

const Filter = ({ sortType }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          fontSize: 13,
          color: "#292929",
          opacity: 0.6,
        }}
      >
        Sort By:
      </Text>
      <View
        style={{
          height: 30,
          width: 160,
          backgroundColor: "#fff",
          marginHorizontal: 10,
          borderWidth: 0.1,
          borderColor: "rgba(29,29,29,0.2)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en"),
            fontSize: 13,
            color: "#292929",
            opacity: 0.6,
          }}
        >
          {sortType.label}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height / 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: "rgba(29,29,29,0.4)",
  },
  addBtn: {
    height: 40,
    width: 40,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
  },
});
