import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Colors from "../../../assets/color/Colors";
import numeral from "numeral";
import { fontFamily, fontSize } from "../../../assets/FontStyleConfig";
import { useHistory } from "react-router-dom";
import shortid from "shortid";

const ServicesScreen = () => {
  const [allServices, setAllServices] = useState(false);
  const services = useSelector((state) => state.features.services);

  const history = useHistory();

  const onPressAddService = (val) => {
    let id;
    if (!val) {
      id = shortid.generate();
    } else {
      id = val;
    }

    //!status 0-add 1-edit
    history.push(window.location.pathname + `/${id}`);
  };

  const setUpServices = async () => {
    try {
      if (services) {
        setAllServices(services);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpServices();
  }, [services]);

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
        <Header onPressAddService={onPressAddService} />
        {allServices &&
          allServices.map((serv, i) => {
            return (
              <IndexItem
                key={serv.id}
                service={serv}
                onPressAddService={onPressAddService}
                isLast={i === allServices.length - 1}
              />
            );
          })}
      </View>
    </View>
  );
};

const Header = ({ onPressAddService }) => {
  const onPress = () => {
    onPressAddService(undefined);
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
        Services
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

const IndexItem = ({ service, onPressAddService, isLast }) => {
  const onPress = () => {
    onPressAddService(service.id);
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
        {service.label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Regular"),
          color: "#292929",
        }}
      >
        {numeral(service.priceDetails.value).format("0.00$")}
      </Text>
    </TouchableOpacity>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({});
