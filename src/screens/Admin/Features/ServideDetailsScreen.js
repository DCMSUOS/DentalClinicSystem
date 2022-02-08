import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../../assets/color/Colors";
import { fontFamily, fontSize } from "../../../assets/FontStyleConfig";
import moment from "moment";
import { setService } from "../../../store/action/featuresAction";
import { useHistory } from "react-router-dom";

const ServideDetailsScreen = (props) => {
  const id = props.match.params.id;

  const [currentService, setCurrentService] = useState(false);
  const [loading, setLoading] = useState(false);
  const services = useSelector((state) => state.features.services);

  useEffect(() => {
    if (services) {
      setUpCurrentService();
    }
  }, [services]);

  const dispatch = useDispatch();
  const history = useHistory();


  const onPressSave = async () => {
    try {
      setLoading(false);
      await dispatch(setService(currentService));
      await history.goBack();
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const setUpCurrentService = () => {
    let curr = services.find((a) => a.id === id);
    if (curr) {
      setCurrentService(curr);
    } else {
      let dt = {
        label: "",
        id,
        priceDetails: { value: 0, discount: 0 },
        disable: false,
        createdAt: moment().valueOf(),
      };
      setCurrentService(dt);
    }
  };

  const onChangeValue = (val, type) => {
    let data = currentService;

    if (type === 0) {
      data.label = val;
    } else if (type === 1) {
      data.priceDetails.value = Number(val);
    } else if (type === 2) {
      data.priceDetails.discount = Number(val);
    }

    setCurrentService({ ...data });
  };

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
        <Header onPressSave={onPressSave} loading={loading} />
        {currentService && (
          <View style={{ width: "100%", paddingVertical: 10 }}>
            <Index label={"ID"} value={currentService.id} />
            <Index
              label={"Created At"}
              value={moment(currentService.createdAt).format("lll")}
            />
            <TextInputIndex
              label={"Name"}
              value={currentService.label}
              onChange={onChangeValue}
              type={0}
            />
            <TextInputIndex
              label={"Price"}
              value={currentService.priceDetails.value}
              onChange={onChangeValue}
              type={1}
            />
            <TextInputIndex
              label={"Discount"}
              value={currentService.priceDetails.discount}
              onChange={onChangeValue}
              type={2}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const Header = ({ onPressSave, loading }) => {
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
        Service
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressSave}
        disabled={loading}
        style={{
          // width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.lightBackgroundColor,
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en"),
            color: Colors.blueColor,
            fontSize: fontSize("en", 13),
          }}
        >
          {loading ? "Loading" : "SAVE"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Index = ({ label, value }) => {
  return (
    <View style={styles.index}>
      <Text
        style={{ fontFamily: fontFamily("en"), color: "#292929", opacity: 0.8 }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          backgroundColor: "#fff",
          padding: 5,
          width: "35%",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

const TextInputIndex = ({ label, value, onChange, type }) => {
  const onChangeText = (val) => {
    onChange(val, type);
  };
  return (
    <View style={styles.index}>
      <Text
        style={{ fontFamily: fontFamily("en"), color: "#292929", opacity: 0.8 }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          fontFamily: fontFamily("en"),
          color: "#292929",
          backgroundColor: "#fff",
          padding: 5,
          width: "35%",
        }}
        onChangeText={onChangeText}
        value={value}
        placeholder={label}
      />
    </View>
  );
};

export default ServideDetailsScreen;

const styles = StyleSheet.create({
  index: {
    width: "90%",
    backgroundColor: Colors.lightBackgroundColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    alignSelf: "center",
    marginVertical: 5,
  },
});
