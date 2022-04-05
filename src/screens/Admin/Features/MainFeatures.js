import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { IoIosList } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

import Colors from "../../../assets/color/Colors";

const MainFeatures = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightBackgroundColor }}>
      <View style={styles.container}>
        <ScrollView
          style={{
            width: "100%",
            marginHorizontal: 30,
            marginTop: 20,
          }}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Container history={props.history} />
        </ScrollView>
      </View>
    </View>
  );
};

const Container = ({ history }) => {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      <Card onPress={() => history.push("/features/services")} title="Services">
        <IoIosList color={"#fe3a59"} size={45} />
      </Card>
      <Card onPress={() => history.push("/features/doctors")} title="Doctors">
        <FaUsers color={"#fe3a59"} size={40} />
      </Card>
      <Card onPress={() => history.push("/features/admins")} title="Admins">
        <MdAdminPanelSettings color={"#fe3a59"} size={40} />
      </Card>
    </View>
  );
};

const Card = ({ onPress, children, title }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.btn]}>
    {children}
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

export default MainFeatures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: -200,
  },
  welcome: {
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    margin: 10,
    opacity: 0.6,
  },
  btn: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    height: 150,
    width: 230,
    marginVertical: 15,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#292929",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
