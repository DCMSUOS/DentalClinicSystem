import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-date-picker";
import "rc-time-picker/assets/index.css";
import { useDispatch } from "react-redux";

import { fontFamily } from "../../../../../assets/FontStyleConfig";
import { updateDuration } from "../../../../../store/action/patientAction";

const controlType = [
  { type: 0, label: "This Month" },
  { type: 1, label: "Last 30 Days" },
  { type: 2, label: "Last 90 Days" },
  { type: 3, label: "Life Time" },
];

const DurationCallender = ({ duration }) => {
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = useState(false);

  const onChangeStartDate = (a) => {
    dispatch(updateDuration(0, new Date(a)));
    setCurrentType(false);
  };

  const onChangeEndDate = (a) => {
    dispatch(updateDuration(1, new Date(a)));
    setCurrentType(false);
  };

  const changeToCurrentMonth = async () => {
    let currentMonth = moment().format("MM");
    let currentYear = moment().format("YYYY");
    let currentDay = moment().add(1 , 'day').format("DD");

    let startDate = new Date(`${currentMonth}-${1}-${currentYear}`);
    let endDate = new Date(`${currentMonth}-${currentDay}-${currentYear}`);

    await dispatch(updateDuration(0, startDate));
    await dispatch(updateDuration(1, endDate));
  };

  const last90Days = async () => {
    let startDate = moment().subtract(90, "day").valueOf();
    let endDate = moment().valueOf();

    await dispatch(updateDuration(0, startDate));
    await dispatch(updateDuration(1, endDate));
  };

  const last30Days = async () => {
    let startDate = moment().subtract(30, "day").valueOf();
    let endDate = moment().valueOf();

    await dispatch(updateDuration(0, startDate));
    await dispatch(updateDuration(1, endDate));
  };

  const lifeTime = async () => {
    let startDate = moment('08-08-2021').valueOf();
    let endDate = moment().valueOf();

    await dispatch(updateDuration(0, startDate));
    await dispatch(updateDuration(1, endDate));
  };

  const onChangeControll = (type) => {
    if (type == 0) {
      changeToCurrentMonth();
    } else if (type == 1) {
      last30Days();
    } else if (type == 2) {
      last90Days();
    } else if (type == 3) {
      lifeTime();
    }
    setCurrentType(type);
  };

  return (
    <View
      style={{
        width: "98.5%",
        height: 50,
        backgroundColor: "#fff",
        alignSelf: "center",
        marginVertical: 8,
        borderRadius: 5,
        justifyContent: "space-between",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 10000,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily("en", "Montserrat-Bold"),
          fontSize: 13,
          opacity: 0.5,
        }}
      >
        Duration
      </Text>
      <Controll currentType={currentType} onChangeControll={onChangeControll} />
      <Pickers
        duration={duration}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
      />
    </View>
  );
};

const Pickers = ({ duration, onChangeStartDate, onChangeEndDate }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "30%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en", "Montserrat-Bold"),
            marginHorizontal: 10,
          }}
        >
          Start
        </Text>
        <DatePicker
          value={new Date(duration.startDate)}
          minDate={new Date("2021-8-1")}
          onChange={onChangeStartDate}
          maxDate={new Date()}
          clearIcon={false}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en", "Montserrat-Bold"),
            marginHorizontal: 10,
          }}
        >
          End
        </Text>
        <DatePicker
          value={new Date(duration.endDate)}
          minDate={new Date("2022-1-1")}
          onChange={onChangeEndDate}
          maxDate={new Date()}
          clearIcon={false}
        />
      </View>
    </View>
  );
};

const Controll = ({ onChangeControll, currentType }) => {
  const onChange = (val) => {
    onChangeControll(val);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "15%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        {controlType && controlType.length !== 0 && (
          <View style={{ marginHorizontal: 15 }}>
            <select
              style={{
                height: "100%",
                color: "rgba(0,0,0,.7)",
                fontFamily: fontFamily("en"),
                borderWidth: 0,
                backgroundColor: "#f0f0f0",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
              value={currentType}
              onChange={(a) => onChange(a.target.value)}
            >
              <option value={""}>Custom</option>
              {controlType.map((bd) => (
                <option value={bd.type}>{bd.label}</option>
              ))}
            </select>
          </View>
        )}
      </View>
    </View>
  );
};

export default DurationCallender;

const styles = StyleSheet.create({});
