import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import { useSelector } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native-web";
import Colors from "../../../../assets/color/Colors";
import numeral from "numeral";

const SelectServiceModal = ({
  selectedExtraType,
  appointmentToView,
  newAppointment,
  onChangeNewAppointmentData,
  onChangeAppointmentData,
  services,
  toggleServiceModal,
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
          height: "20%",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
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
          Select Service
        </Text>
        <TouchableOpacity onPress={toggleServiceModal}>
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
            {services &&
              services.length !== 0 &&
              services.map((dc, i) => {
                return (
                  <ServiceIndex
                    key={i}
                    service={dc}
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

const ServiceIndex = ({
  service,
  selectedExtraType,
  appointmentToView,
  newAppointment,
  onChangeNewAppointmentData,
  onChangeAppointmentData,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const checkForValidation = () => {
    let data = {};
    if (selectedExtraType === 0 && newAppointment) {
      data = newAppointment;
    } else {
      data = appointmentToView;
    }

    let check = data.services.find((a) => a.id === service.id);
    setIsSelected(!!check);
  };

  const onPress = () => {
    if (selectedExtraType === 0) {
      onChangeNewAppointmentData(3, service);
    } else {
      onChangeAppointmentData(3, service);
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
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
      onPress={onPress}
    >
      <Text
        numberOfLines={1}
        style={{
          fontFamily: fontFamily("en"),
          textTransform: "capitalize",
          color: isSelected ? "green" : "#292929",
          width: "50%",
        }}
      >
        {service.label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          textTransform: "capitalize",
          color: isSelected ? "green" : "#292929",
        }}
      >
        {numeral(service.priceDetails.value).format("0.00$")}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectServiceModal;

const styles = StyleSheet.create({});
