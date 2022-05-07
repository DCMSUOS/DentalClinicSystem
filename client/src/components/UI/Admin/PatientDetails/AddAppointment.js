import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import "rc-time-picker/assets/index.css";
import DatePicker from "react-date-picker";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../../../assets/color/Colors";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import shortid from "shortid";
import moment from "moment";
import { addAppointment } from "../../../../store/action/patientAction";
import { async } from "@firebase/util";

const { height, width } = Dimensions.get("window");

const AddAppointment = ({
  data,
  onChangeNewAppointmentData,
  patientId,
  selectedExtraType,
  onChangeAppointmentData,
  onViwingAppointment,
  loading,
  changeLoading,
  toggleUpDoctorsModal,
  toggleServiceModal,
}) => {
  const [doctor, setDoctor] = useState(false);
  const allAdmins = useSelector((state) => state.features.admins);

  const setUpDoctor = () => {
    let currDoctor;

    currDoctor = allAdmins.find((a) => a.id === data.doctorId);

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
      changeLoading(true);
      let dt = {
        ...data,
        id: shortid.generate(),
        createdAt: moment().valueOf(),
        date: moment(data.date).valueOf(),
        sitType: 0,
        isDeleted: false,
        patientId: patientId,
      };

      if (selectedExtraType === 1) {
        dt = { ...dt, ...data };
      }

      await dispatch(addAppointment(dt));
    } catch (e) {
      changeLoading(false);
      console.log(e);
    }
    changeLoading(false);
  };

  const onChangeSitTypeAppointment = async (type) => {
    try {
      changeLoading(true);
      let dt = {
        ...data,
      };

      if (selectedExtraType === 1) {
        dt = { ...dt, ...data };
      }

      if (type === 3 || type === 2) {
        dt.date = moment().subtract(10, "minute").valueOf();
      }

      if (type === 1) {
        dt.openAt = moment().valueOf();
      }
      if (type === 2) {
        dt.doneAt = moment().valueOf();
      }
      if (type === 3) {
        dt.closeAt = moment().valueOf();
      }

      if (type === 0 && dt.date < moment().valueOf()) {
        changeLoading(false);
        return window.alert("Invalid Date", "Invalid Date");
      }

      dt = { ...dt, sitType: type };

      await dispatch(addAppointment(dt));
      await onViwingAppointment(dt.id);
    } catch (e) {
      changeLoading(false);
      console.log(e);
    }
    changeLoading(false);
  };

  const onDeleteAppointment = async () => {
    try {
      changeLoading(true);
      let dt = {
        ...data,
      };

      if (selectedExtraType === 1) {
        dt = { ...dt, ...data };
      }

      dt = { ...dt, isDeleted: true };

      await dispatch(addAppointment(dt));
      await onViwingAppointment(dt.id);
    } catch (e) {
      changeLoading(false);
      console.log(e);
    }
    changeLoading(false);
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
            onChangeNewAppointmentData={
              selectedExtraType === 0
                ? onChangeNewAppointmentData
                : onChangeAppointmentData
            }
          />
          <ButtonContainer
            onPress={toggleUpDoctorsModal}
            type={1}
            value={!doctor ? "Select" : `${doctor.firstname}`}
            label={"Doctor"}
          />
          <ButtonContainer
            type={2}
            value={data.services.length + " Services"}
            label={"Service"}
            onPress={toggleServiceModal}
          />
          <ChoiseContainer
            selectedExtraType={selectedExtraType}
            data={data}
            onDeleteAppointment={onDeleteAppointment}
            onAddAppointment={onAddAppointment}
            onChangeSitTypeAppointment={onChangeSitTypeAppointment}
          />
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

const ChoiseContainer = ({
  onAddAppointment,
  selectedExtraType,
  data,
  onChangeSitTypeAppointment,
  onDeleteAppointment,
}) => {
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
      {selectedExtraType !== 0 && data.sitType !== 0 && (
        <Button
          label={"Back To Pending"}
          color={Colors.orangeColor}
          onPress={() => {
            onChangeSitTypeAppointment(0);
          }}
        />
      )}
      {selectedExtraType !== 0 && data.sitType !== 1 && (
        <Button
          label={"Open"}
          color={Colors.blueColor}
          onPress={() => {
            onChangeSitTypeAppointment(1);
          }}
        />
      )}
      {selectedExtraType !== 0 && data.sitType !== 2 && (
        <Button
          label={"Done"}
          color={Colors.greenColor}
          onPress={() => {
            onChangeSitTypeAppointment(2);
          }}
        />
      )}
      {selectedExtraType !== 0 && (
        <Button label={"Add to queue"} color={Colors.orangeColor} />
      )}
      {selectedExtraType !== 0 && data.sitType !== 3 && (
        <Button
          label={"Close"}
          color={Colors.redColor}
          onPress={() => {
            onChangeSitTypeAppointment(3);
          }}
        />
      )}
      {selectedExtraType !== 0 && (
        <Button
          label={"Delete"}
          color={Colors.redColor}
          onPress={onDeleteAppointment}
        />
      )}
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
    onChangeNewAppointmentData(type, val);
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
        value={new Date(value)}
        minDate={new Date()}
        onChange={onChange}
      />
    </View>
  );
};

const ButtonContainer = ({ label, value, onPress }) => {
  const onChange = () => {
    onPress();
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
        {label}
      </Text>
      <TouchableOpacity
        onPress={onChange}
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
            textTransform: "capitalize",
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
