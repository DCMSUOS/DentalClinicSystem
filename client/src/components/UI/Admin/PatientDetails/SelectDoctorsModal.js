import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-web";
import Colors from "../../../../assets/color/Colors";

const SelectDoctorsModal = ({
  selectedExtraType,
  appointmentToView,
  newAppointment,
  onChangeNewAppointmentData,
  onChangeAppointmentData,
  doctors,
  toggleUpDoctorsModal,
}) => {
  return (
    <View
      style={{
        height: "90%",
        width: "90%",
        backgroundColor: "#fff",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "20%",
        }}
      >
        <Text
          style={{
            margin: 20,
            fontFamily: fontFamily("en", "Montserrat-Bold"),
            color: "#292929",
            opacity: 0.8,
          }}
        >
          Select Doctors
        </Text>
        <TouchableOpacity onPress={toggleUpDoctorsModal}>
          <Text
            style={{
              margin: 20,
              fontFamily: fontFamily("en", "Montserrat-Bold"),
              color: Colors.redColor,
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: "80%" }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {doctors &&
              doctors.length !== 0 &&
              doctors.map((dc, i) => {
                if (dc.type === "Doctor")
                  return (
                    <DoctorsIndex
                      key={i}
                      doctor={dc}
                      selectedExtraType={selectedExtraType}
                      appointmentToView={appointmentToView}
                      newAppointment={newAppointment}
                      onChangeNewAppointmentData={onChangeNewAppointmentData}
                      onChangeAppointmentData={onChangeAppointmentData}
                    />
                  );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const DoctorsIndex = ({
  doctor,
  selectedExtraType,
  appointmentToView,
  newAppointment,
  onChangeNewAppointmentData,
  onChangeAppointmentData,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const checkForValidation = () => {
    let data = {};
    if (selectedExtraType === 0) {
      data = newAppointment;
    } else {
      data = appointmentToView;
    }

    if (data.doctorId === doctor.id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  const onPress = () => {
    if (selectedExtraType === 0) {
      onChangeNewAppointmentData(2, doctor.id);
    } else {
      onChangeAppointmentData(2, doctor.id);
    }
  };

  useEffect(() => {
    checkForValidation();
  }, [selectedExtraType, appointmentToView, newAppointment]);

  return (
    <TouchableOpacity
      style={{
        width: "48%",
        margin: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
      }}
      onPress={onPress}
    >
      <Image
        style={{
          height: 40,
          width: 40,
          marginHorizontal: 10,
          borderRadius: 5,
        }}
        source={{ uri: doctor.image }}
      />
      <Text
        style={{
          fontFamily: fontFamily("en"),
          textTransform: "capitalize",
          color: isSelected ? "green" : "#292929",
        }}
      >
        {doctor.firstname} {doctor.lastname}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectDoctorsModal;

const styles = StyleSheet.create({});
