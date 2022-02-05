import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../assets/color/Colors";
import { fontFamily, fontSize } from "../../assets/FontStyleConfig";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/action/authenticationAction";

const { height, width } = Dimensions.get("window");

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const onPressLogin = async () => {
    setError("");
    let userData = {
      email,
      password,
    };

    if (!email && !password) {
      setError("Fill all input");
      return;
    }
    try {
      const response = await dispatch(LOGIN(userData));
    } catch (e) {
      setError("There is an issue with your authentication");
    }
  };

  const onChangeEmail = (val) => {
    setEmail(val);
  };

  const onChangePassword = (val) => {
    setPassword(val);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkBackgroudColor }}>
      <View style={styles.container}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: fontFamily("en", "Montserrat-Medium"),
              fontSize: fontSize("en", 20),
            }}
          >
            DCMS
          </Text>
          {error && (
            <Text style={{ color: "red", fontFamily: "Montserrat-Regular" }}>
              {error}
            </Text>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={onChangePassword}
          secureTextEntry={true}
          value={password}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.login}
          onPress={onPressLogin}
        >
          <View>
            {!loading ? (
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: fontFamily("en"),
                }}
              >
                LOGIN
              </Text>
            ) : (
              <ActivityIndicator color="#fff" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "70%",
    height: 460,
    minWidth: 700,
    maxWidth: 700,
    alignSelf: "center",
    marginTop: 100,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    height: 36,
    paddingHorizontal: 6,
    fontSize: 16,
    borderWidth: 0.8,
    borderColor: "rgba(29,29,29,0.2)",
    borderRadius: 0,
    marginVertical: 15,
    fontFamily: "Montserrat-Light",
    alignSelf: "center",
  },
  login: {
    width: "70%",
    height: 40,
    backgroundColor: Colors.darkBackgroudColor,
    padding: 3,
    alignItems: "center",
    marginTop: 50,
    borderRadius: 0,
    justifyContent: "center",
  },
});
