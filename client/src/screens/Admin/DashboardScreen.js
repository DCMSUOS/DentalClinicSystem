import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllDoctors,
  fetchAllServices,
} from "../../store/action/featuresAction";
import {
  fetchAllAppointments,
  fetchAllPateints,
  updateDuration,
} from "../../store/action/patientAction";
import moment from "moment";

import Bottom from "../../components/UI/Dashboard/Report/Review/Bottom";
import Upper from "../../components/UI/Dashboard/Report/Review/Upper";
import ViewTotalDataContainer from "../../components/UI/Dashboard/Report/Review/ViewTotalDataContainer";
import { useHistory } from "react-router-dom";
import { priceCalculation } from "../../function/priceCalculation";
import DurationCallender from "../../components/UI/Dashboard/Report/Review/DurationCallender";

const DashboardScreen = () => {
  const [data, setData] = useState(false);
  const [detailsData, setDetailsData] = useState(false);
  const [durationObj, setDurationObj] = useState(false);

  const AllAppointments = useSelector((state) => state.patients.appointments);
  const AllPateints = useSelector((state) => state.patients.patients);
  const duration = useSelector((state) => state.patients.duration);

  const dispatch = useDispatch();
  const history = useHistory();

  const setUp = async () => {
    try {
      await dispatch(fetchAllServices());
      await dispatch(fetchAllDoctors());
      await dispatch(fetchAllPateints());
      await dispatch(fetchAllAppointments());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUp();
  }, []);

  const setUpData = async () => {
    let arr = AllAppointments;

    let newArr = arr.filter((a) => true);

    let duratObj = await createDurationObject();

    setDurationObj(duratObj);
    setData(newArr);
  };

  const createDurationObject = () => {
    let startYear = Number(moment(duration.startDate).format("Y"));
    let startMonth = Number(moment(duration.startDate).format("M"));

    let endYear = Number(moment(duration.endDate).format("Y"));
    let endMonth = Number(moment(duration.endDate).format("M"));

    let date = undefined;
    let arr = [];

    while (true) {
      date = moment(`${startMonth}/1/${startYear}`).valueOf();
      arr.push({ date });

      if (startMonth === 12) {
        startMonth = 0;
        startYear++;
      }

      if (startMonth === endMonth && startYear === endYear) {
        break;
      }
      startMonth++;
    }

    return arr;
  };

  const setUpDuration = () => {
    if (history.location.pathname !== "/reports") changeToCurrentMonth();
  };

  const changeToCurrentMonth = async () => {
    let currentMonth = moment().format("MM");
    let currentYear = moment().format("YYYY");
    let currentDay = moment().add(1, "day").format("DD");

    let startDate = new Date(`${currentMonth}-${1}-${currentYear}`);
    let endDate = new Date(`${currentMonth}-${currentDay}-${currentYear}`);

    await dispatch(updateDuration(0, startDate));
    await dispatch(updateDuration(1, endDate));
  };

  useEffect(() => {
    setUpDuration();
  }, []);

  const setUpMianChartData = async () => {
    let datasets = [];
    let labels = [];
    let numOfAppointment = 0;
    let numOfClose = 0;
    let numOfDone = 0;
    let numOfPending = 0;
    let numOfOpen = 0;

    let allOrdersObj = {
      label: "Appointments",
      backgroundColor: "rgba(34, 33, 39,0.6)",
    };
    allOrdersObj.data = [];

    let doneObj = {
      label: "Done",
      backgroundColor: "rgba(12, 232, 126,0.6)",
    };
    doneObj.data = [];

    let pendingObj = {
      label: "Pending",
      backgroundColor: "rgba(254, 112, 50,0.6)",
    };
    pendingObj.data = [];

    let closeObj = {
      label: "Closed",
      backgroundColor: "rgba(242, 80, 93,0.6)",
    };
    closeObj.data = [];

    let openObj = {
      label: "Open",
      backgroundColor: "rgba(12, 199, 232,0.6)",
    };
    openObj.data = [];

    durationObj.forEach((dt) => {
      let date = dt.date;
      labels.push(moment(date).format("MM-YYYY"));

      let currentMonthData = data.filter(
        (a) => moment().format("MM-YYYY") === moment(date).format("MM-YYYY")
      );

      let currentMonthPendingData = currentMonthData.filter(
        (a) => a.sitType === 0
      );

      let currentMonthOpenData = currentMonthData.filter(
        (a) => a.sitType === 1
      );
      let currentMonthDoneData = currentMonthData.filter(
        (a) => a.sitType === 2
      );

      let currentMonthClosedData = currentMonthData.filter(
        (a) => a.sitType === 3
      );

      let currentMonthAllOrdersData = currentMonthData;

      numOfAppointment += currentMonthAllOrdersData.length;
      numOfDone += currentMonthDoneData.length;
      numOfClose += currentMonthClosedData.length;
      numOfOpen += currentMonthOpenData.length;
      numOfPending += currentMonthPendingData.length;

      doneObj.data.push(currentMonthDoneData.length);
      closeObj.data.push(currentMonthClosedData.length);
      allOrdersObj.data.push(currentMonthAllOrdersData.length);
      pendingObj.data.push(currentMonthPendingData.length);
      openObj.data.push(currentMonthOpenData.length);
    });

    datasets = [
      {
        ...allOrdersObj,
      },
      {
        ...doneObj,
      },
      {
        ...pendingObj,
      },
      {
        ...openObj,
      },
    ];

    if (numOfClose) {
      datasets.push({ ...closeObj });
    }

    let mainChartData = {
      labels,
      datasets,
    };

    let totalData = [];

    totalData.push({
      label: "Total Appointments",
      value: numOfAppointment,
      desciption: "",
    });

    totalData.push({
      label: "Pending Appointments",
      value: numOfPending,
      desciption: "",
    });

    if (numOfOpen)
      totalData.push({
        label: "Open Appointments",
        value: numOfOpen,
        desciption: "",
      });

    if (numOfDone)
      totalData.push({
        label: "Complete Appointments",
        value: numOfDone,
        desciption: "",
      });

    if (numOfClose) {
      totalData.push({
        label: "Close Appointment",
        value: numOfClose,
        desciption: "",
      });
    }

    let totalPriceData = await setUpTotalBenefit();

    let obj = { ...detailsData, mainChartData, totalData, totalPriceData };

    setDetailsData({ ...obj });
  };

  useEffect(() => {
    if (data && durationObj) {
      setUpMianChartData();
    }
  }, [data, durationObj]);

  const setUpTotalBenefit = () => {
    let totalPrice = 0;
    let totalTrainerBenefit = 0;
    let totalBullHeadBenefit = 0;

    data.forEach((order) => {
      let data = priceCalculation();

      // totalPrice += data.finalPrice;
      // totalBullHeadBenefit += data.bullheadBenfit;
      // totalTrainerBenefit += data.trainerBenefit;
    });

    let totalPriceData = {
      totalPrice: 0,
      totalTrainerBenefit: 0,
      totalBullHeadBenefit: 0,
    };

    return totalPriceData;
  };

  useEffect(() => {
    if (AllAppointments && duration) setUpData();
  }, [duration, AllAppointments]);

  const onPressViewAllOrder = () => {
    // if (id) history.push(`/admin/analytics/orders`, { type: 1, data });
    // else {
    //   history.push(`/statistics/orders`, { type: 1, data });
    // }
  };

  return (
    <ScrollView
      style={{ flex: 1, width: "100%", backgroundColor: "#f1f1f1" }}
      showsVerticalScrollIndicator={false}
    >
      {history.location.pathname === "/reports" && (
        <DurationCallender duration={duration} />
      )}

      {false && data.length !== 0 && (
        <ViewTotalDataContainer
          data={data}
          onPressViewAllOrder={onPressViewAllOrder}
        />
      )}

      {detailsData && duration && (
        <Upper detailsData={detailsData} duration={duration} />
      )}
      {detailsData && duration && (
        <Bottom detailsData={detailsData} duration={duration} />
      )}
      <View style={{ height: 30, width: "100%" }} />
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
