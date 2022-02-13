import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../assets/color/Colors";
import { customAlphabet } from "nanoid/async";
import { useHistory } from "react-router-dom";

import { BsFillPersonFill } from "react-icons/bs";
import { fontFamily, fontSize } from "../../../assets/FontStyleConfig";
import { useDispatch } from "react-redux";
import { createUser } from "../../../store/action/authenticationAction";
import shortid from "shortid";
import moment from "moment";
import { addPatient } from "../../../store/action/patientAction";

const accountTypes = [
  { label: "Male", type: 0 },
  { label: "Female", type: 1 },
];

const AddPatientScreen = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const onChangePhoneNumber = (val) => {
    setPhoneNumber(val);
  };

  const onChangeFirstName = (val) => {
    setFirstname(val);
  };

  const onChangeLastName = (val) => {
    setLastname(val);
  };
  const onChangeBirthdate = (val) => {
    setBirthdate(val);
  };

  const onChangeType = (val) => {
    setType(val);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const onPressCreateUser = async () => {
    let genderLabel = accountTypes.find((a) => a.type === type);
    let id = shortid.generate();
    let createdAt = moment().valueOf();
    let birthday = new Date(birthdate).valueOf();

    let userData = {
      firstname,
      lastname,
      gender: genderLabel.label,
      id,
      phoneNumber,
      birthdate: birthday,
      createdAt,
      idNumber,
    };

    try {
      await dispatch(addPatient(userData));
      setTimeout(() => {
        history.push("/patients" + `/${id}`);
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };

  const setUpIdNumber = async () => {
    const nanoid = customAlphabet("1234567890", 6);
    let id = await nanoid();
    setIdNumber(id);
  };

  useEffect(() => {
    setUpIdNumber();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: Colors.lightBackgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <View style={{ width: 900, backgroundColor: "#fff" }}>
          <ProfilePecture firstname={firstname} lastname={lastname} />
          <View>
            <ConstantIndex label={"ID"} value={`#${idNumber}`} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={onChangeFirstName}
              value={firstname}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              onChangeText={onChangeLastName}
              value={lastname}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={onChangePhoneNumber}
              value={phoneNumber}
            />

            <TextInput
              style={styles.input}
              placeholder="1995-11-31"
              onChangeText={onChangeBirthdate}
              value={birthdate}
            />
            <AccountType
              accountTypes={accountTypes}
              type={type}
              onChangeType={onChangeType}
            />
            <SubmitButton onPressCreateUser={onPressCreateUser} />
          </View>
        </View>
    </ScrollView>
  );
};

const ConstantIndex = ({ label, value }) => {
  return (
    <View style={[styles.input, { paddingRight: 40 }]}>
      <Text
        style={{
          fontSize: fontSize("en", 15),
          fontFamily: fontFamily("en"),
          opacity: 0.5,
        }}
      >
        {label}
      </Text>
      <Text
        style={{ fontSize: fontSize("en", 15), fontFamily: fontFamily("en") }}
      >
        {value}
      </Text>
    </View>
  );
};

const SubmitButton = ({ onPressCreateUser }) => {
  return (
    <View style={{ width: "100%", alignItems: "center", marginVertical: 10 }}>
      <TouchableOpacity
        onPress={onPressCreateUser}
        style={{
          backgroundColor: Colors.blueColor,
          padding: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en"),
            color: "#fff",
            fontSize: fontSize("en", 20),
          }}
        >
          Create User
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AccountType = ({ accountTypes, type, onChangeType }) => {
  const onChange = (val) => {
    onChangeType(val);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        marginVertical: 20,
      }}
    >
      {accountTypes.map((tp, i) => {
        return (
          <TouchableOpacity key={i} onPress={onChange.bind(this, tp.type)}>
            <Text
              style={{
                fontFamily: fontFamily("en"),
                fontSize: fontSize("en", 15),
                backgroundColor:
                  type !== tp.type
                    ? "rgba(29,29,29,0.2)"
                    : "rgba(46, 120, 233,0.8)",
                padding: 5,
                color: "#fff",
                paddingHorizontal: 15,
              }}
            >
              {tp.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ProfilePecture = ({ firstname, lastname }) => {
  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <View style={styles.ppContainer}>
        <BsFillPersonFill
          size={70}
          color={Colors.blueColor}
          style={{ opacity: 0.8 }}
        />
      </View>
      <Text style={{ fontFamily: fontFamily("en") }}>
        {firstname && lastname ? firstname + " " + lastname : "Unknown"}
      </Text>
    </View>
  );
};

export default AddPatientScreen;

const styles = StyleSheet.create({
  ppContainer: {
    height: 90,
    width: 90,
    borderRadius: 100,
    alignSelf: "center",
    backgroundColor: Colors.lightBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  input: {
    alignSelf: "center",
    width: "80%",
    padding: 10,
    borderRadius: 0,
    backgroundColor: Colors.lightBackgroundColor,
    marginVertical: 8,
    fontSize: fontSize("en", 15),
    fontFamily: fontFamily("en"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
