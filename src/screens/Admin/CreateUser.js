import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../assets/color/Colors";

import { BsFillPersonFill } from "react-icons/bs";
import { fontFamily, fontSize } from "../../assets/FontStyleConfig";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/action/authenticationAction";

const accountTypes = [
  { label: "Admin", type: 0 },
  { label: "Doctor", type: 1 },
];

const CreateUser = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const onChangeEmail = (val) => {
    setEmail(val);
  };

  const onChangePassword = (val) => {
    setPassword(val);
  };

  const onChangeFirstName = (val) => {
    setFirstname(val);
  };

  const onChangeLastName = (val) => {
    setLastname(val);
  };

  const onChangeType = (val) => {
    setType(val);
  };

  const dispatch = useDispatch();
  const onPressCreateUser = async () => {
    let typeLabel = accountTypes.find((a) => a.type === type);
    let userData = { email, password, firstname, lastname };

    try {
      await dispatch(createUser(userData));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.lightBackgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ width: 900, backgroundColor: "#fff" }}>
        <ProfilePecture firstname={firstname} lastname={lastname} />
        <View>
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
            placeholder="Email"
            onChangeText={onChangeEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
          />
          <AccountType
            accountTypes={accountTypes}
            type={type}
            onChangeType={onChangeType}
          />
          <SubmitButton onPressCreateUser={onPressCreateUser} />
        </View>
      </View>
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

export default CreateUser;

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
  },
});
