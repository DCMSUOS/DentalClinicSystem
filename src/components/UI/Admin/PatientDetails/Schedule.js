import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../../assets/color/Colors";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import moment from "moment";
import ExtraPart from "./ExtraPart";

const { height, width } = Dimensions.get("window");

const FilterTypes = [
  { type: 0, label: "All" },
  { type: 1, label: "Upcoming" },
  { type: 2, label: "Post" },
];

const Schedule = ({
  currentAppointments,
  onPressAddAppointment,
  selectedExtraType,
  onViwingAppointment,
  appointmentToView,
  newAppointment,
  onChangeNewAppointmentData,
  patientId,
}) => {
  const [filterType, setFilterType] = useState(1);
  const [appointments, setAppointments] = useState(false);

  const onChangeFilterType = (val) => {
    setFilterType(val);
  };

  const setUpAppointments = () => {
    let dt = [];
    currentAppointments.forEach((app) => {
      if (filterType === 0) {
        dt.push(app);
      } else if (filterType === 1 && app.date <= moment().valueOf()) {
        dt.push(app);
      } else if (filterType === 2 && app.date > moment().valueOf()) {
        dt.push(app);
      }
    });

    dt.sort((a, b) => a.date - b.date);

    setAppointments(dt);
  };

  useEffect(() => {
    if (currentAppointments && currentAppointments.length !== 0)
      setUpAppointments();
  }, [filterType, currentAppointments]);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <Filter
          onChangeFilterType={onChangeFilterType}
          filterType={filterType}
          onPressAddAppointment={onPressAddAppointment}
        />
        <AppointmentsContainer
          appointments={appointments}
          onViwingAppointment={onViwingAppointment}
        />
      </View>
      <ExtraPart
        selectedExtraType={selectedExtraType}
        appointmentToView={appointmentToView}
        newAppointment={newAppointment}
        onChangeNewAppointmentData={onChangeNewAppointmentData}
        patientId={patientId}
        appointmentToView={appointmentToView}
      />
    </View>
  );
};

const Filter = ({ filterType, onChangeFilterType, onPressAddAppointment }) => {
  const onPress = (val) => {
    onChangeFilterType(val);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={styles.filterCointainer}>
        {FilterTypes.map((ft, i) => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPress.bind(this, ft.type)}
              key={i}
              style={{
                backgroundColor: filterType === ft.type ? "#fff" : null,
                padding: 10,
                width: "25%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                height: "80%",
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily("en", "Montserrat-Bold"),
                  color:
                    filterType === ft.type
                      ? Colors.blueColor
                      : "rgba(29,29,29,0.5)",
                }}
              >
                {ft.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.addAppointmentBtn}
        onPress={onPressAddAppointment}
      >
        <Text
          style={{
            fontFamily: fontFamily("en"),
            color: Colors.lightBackgroundColor,
            fontSize: 25,
            paddingHorizontal: 7,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AppointmentsContainer = ({ appointments, onViwingAppointment }) => {
  return (
    <View style={styles.appointmentsContainer}>
      <ScrollView
        contentContainerStyle={{
          height: height / 2.5,
          alignItems: "center",
        }}
      >
        {appointments && appointments.length !== 0 ? (
          appointments.map((d, i) => {
            return (
              <AppointmentItem
                key={d.id}
                appointment={d}
                onViwingAppointment={onViwingAppointment}
              />
            );
          })
        ) : (
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontFamily: fontFamily("en", "Montserrat-Bold"),
                color: "#292929",
                opacity: 0.5,
                fontSize: 20,
              }}
            >
              No Data Found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const AppointmentItem = ({ appointment, onViwingAppointment }) => {
  const [currentDoctor, setCurrentDoctor] = useState(false);

  const onPress = () => {
    onViwingAppointment(appointment.id);
  };

  return (
    <TouchableOpacity
      style={styles.appointmentIndex}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View>
        <Text
          style={{
            fontFamily: fontFamily("en", "Montserrat-Light"),
            color: "#292929",
            fontSize: 25,
            opacity: 0.7,
          }}
        >
          {moment(appointment.date).format(`DD MMM'YY`)}
        </Text>
      </View>
      <LabelIndex
        label={"Treatment"}
        value={moment(appointment.date).format(`DD MMM'YY`)}
      />
      <LabelIndex label={"Dentist"} value="Drg. alla" />
      <LabelIndex label={"Situation"} value="Open" color={"green"} />
    </TouchableOpacity>
  );
};

const LabelIndex = ({ label, value, color }) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Regular"),
          color: "#292929",
          fontSize: 13,
          opacity: 0.6,
          marginBottom: 5,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          color: color || "#292929",
          fontSize: 20,
          opacity: 0.9,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    width: "65.6%",
    backgroundColor: "#fff",
    // alignSelf: "center",
    padding: 5,
    marginVertical: 20,
    borderRadius: 10,
    height: height / 1.7,
  },
  appointmentsContainer: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#eff2f6",
    marginVertical: 30,
    borderRadius: 7,
    paddingVertical: 10,
  },
  appointmentIndex: {
    width: "95%",
    height: height / 8.7,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingRight: 56,
  },
  addAppointmentBtn: {
    backgroundColor: Colors.blueColor,
    height: height / 16,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filterCointainer: {
    backgroundColor: Colors.lightBackgroundColor,
    paddingHorizontal: 10,
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    borderRadius: 5,
    marginVertical: 10,
    height: height / 16,
    alignItems: "center",
  },
});
