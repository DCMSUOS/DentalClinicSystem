import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../assets/color/Colors";
import { fontFamily, fontSize } from "../../../assets/FontStyleConfig";
import { useSelector } from "react-redux";

const DoctorsScreen = () => {
  const [allDoctors, setAllDoctors] = useState(false);
  const allAdmins = useSelector((state) => state.features.admins);

  const setUpAllAdmins = () => {
    let data = [];

    data = allAdmins.filter((a) => a.type === "Doctor");


    setAllDoctors(data);
  };

  useEffect(() => {
    if (allAdmins) {
      setUpAllAdmins();
    }
  }, [allAdmins]);

  const onPressAddAdmins = () => {};
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.lightBackgroundColor,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          width: 900,
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Header onPressAddAdmins={onPressAddAdmins} />
        {allDoctors &&
          allDoctors.map((doct, i) => {
            return (
              <IndexItem
                key={doct.id}
                doctor={doct}
                onPressAddAdmins={onPressAddAdmins}
                isLast={i === allDoctors.length - 1}
              />
            );
          })}
      </View>
    </View>
  );
};

const IndexItem = ({ doctor, onPressAddAdmins, isLast }) => {
  const onPress = () => {
    onPressAddAdmins(doctor.id);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: Colors.lightBackgroundColor,
        width: "90%",
        marginVertical: 5,
        borderRadius: 5,
        marginBottom: isLast ? 40 : 5,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
        }}
      >
        {doctor.firstname + " " + doctor.lastname}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Regular"),
          color: "#292929",
        }}
      ></Text>
    </TouchableOpacity>
  );
};

const Header = ({ onPressAddAdmins }) => {
  const onPress = () => {
    onPressAddAdmins(undefined);
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        backgroundColor: Colors.blueColor,
        height: 50,
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#fff",
          fontSize: fontSize("en", 17),
        }}
      >
        Doctors
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.lightBackgroundColor,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en"),
            color: Colors.blueColor,
            fontSize: fontSize("en", 27),
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorsScreen;

const styles = StyleSheet.create({});
