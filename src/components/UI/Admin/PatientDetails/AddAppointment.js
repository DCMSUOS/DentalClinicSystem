import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../../../assets/color/Colors";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import shortid from "shortid";
import moment from "moment";
import { addAppointment } from "../../../../store/action/patientAction";

const { height, width } = Dimensions.get("window");

const AddAppointment = ({ data, onChangeNewAppointmentData, patientId }) => {
  const [doctor, setDoctor] = useState(false);
  const [loading, setLoading] = useState(false);
  const allAdmins = useSelector((state) => state.features.admins);

  const setUpDoctor = () => {
    let currDoctor;

    currDoctor = allAdmins.find(
      (a) => a.type === "Doctor" && a.id === data.doctorId
    );

    if (currDoctor) setDoctor(currDoctor);
  };

  useEffect(() => {
    if (data && data.doctorId && allAdmins) {
      setUpDoctor();
    }
  }, [data, allAdmins]);

  const dispatch = useDispatch();

  const onAddAppointment = async () => {
    try {
      setLoading(true);
      let dt = {
        ...data,
        id: shortid.generate(),
        createdAt: moment().valueOf(),
        date: new Date(data.date).valueOf(),
        sitType: 0,
        isDeleted: false,
        services: [{ id: "O4GsvLBQ" }],
        patientId: patientId,
      };
      await dispatch(addAppointment(dt));
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          margin: 10,
          fontFamily: fontFamily("en"),
          color: "#292929",
          opacity: 0.5,
        }}
      >
        Add Appointment - #{data.numberId}
      </Text>
      {!loading ? (
        <View style={styles.details}>
          <AppointmentDate
            type={0}
            value={data.date}
            onChangeNewAppointmentData={(val) => {
              console.log(val);
              //  data.date = val;
            }}
          />
          <ButtonContainer
            type={1}
            value={!doctor ? "Select" : `${doctor.firstname}`}
            label={"Doctor"}
          />
          <ButtonContainer type={2} value={"test"} label={"Service"} />
          <ChoiseContainer onAddAppointment={onAddAppointment} />
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

const ChoiseContainer = ({ onAddAppointment }) => {
  return (
    <View
      style={[
        styles.index,
        {
          borderWidth: 0,
          marginTop: 30,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Button label={"Close"} color={Colors.purple} />
      <Button label={"Add to queue"} color={Colors.orangeColor} />
      <Button label={"Delete"} color={Colors.redColor} />
      <Button
        label={"Save"}
        color={Colors.greenColor}
        onPress={onAddAppointment}
      />
    </View>
  );
};

const Button = ({ label, onPress, color, fontColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: Colors.lightBackgroundColor,
        paddingVertical: 10,
        borderRadius: 2,
        width: "45%",
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderWidth: 0.4,
        borderColor: color,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: color || "#fff",
          opacity: 0.8,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const AppointmentDate = ({ type, onChangeNewAppointmentData, value }) => {
  const onChange = (val) => {
    onChangeNewAppointmentData(val);
  };
  return (
    <View style={styles.index}>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          color: "#292929",
          opacity: 0.9,
        }}
      >
        Date
      </Text>
      <DatePicker
        className="react-date-picker"
        value={value}
        minDate={new Date()}
        onChange={onChange}
        calendarType="Arabic"
      />
    </View>
  );
};

const ButtonContainer = ({ label, value }) => {
  const onChange = () => {};
  return (
    <View style={styles.index}>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          color: "#292929",
          opacity: 0.9,
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.lightBackgroundColor,
          paddingHorizontal: 20,
          paddingVertical: 5,
          borderRadius: 200,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en"),
            color: "#292929",
            opacity: 0.7,
          }}
        >
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAppointment;

const styles = StyleSheet.create({
  container: {
    width: "33%",
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 20,
    borderRadius: 10,
    height: height / 1.7,
  },
  details: { marginTop: 20 },
  index: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 20,
    borderBottomWidth: 0.3,
    borderColor: "rgba(29,29,29,0.2)",
    paddingBottom: 10,
    alignItems: "center",
  },
});
