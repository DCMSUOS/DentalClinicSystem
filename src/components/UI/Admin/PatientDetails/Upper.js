import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../../assets/color/Colors";
import { fontFamily } from "../../../../assets/FontStyleConfig";
import { BsFillPersonFill } from "react-icons/bs";
import moment from "moment";

const { height, width } = Dimensions.get("window");

const HEIGHT_OF_CONTAINER = height / 2.2;

const Upper = ({ currentPatient }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "center",
      }}
    >
      <ProfileContainer currentPatient={currentPatient} />
      <DetailsContainer currentPatient={currentPatient} />
      <NoteContainer />
    </View>
  );
};

export default Upper;

const ProfileContainer = ({ currentPatient }) => {
  return (
    <View
      style={{
        width: "20%",
        height: HEIGHT_OF_CONTAINER,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 200,
          backgroundColor: Colors.lightBackgroundColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BsFillPersonFill
          size={60}
          color={currentPatient.gender === "Male" ? Colors.blueColor : "pink"}
          style={{ opacity: 0.8 }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: fontFamily("en", "Montserrat-Bold"),
            color: "#292929",
            marginTop: 10,
            textTransform: "capitalize",
            fontSize: 23,
            opacity: 0.9,
          }}
        >
          {currentPatient.firstname} {currentPatient.lastname}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily("en"),
            color: "#292929",
            marginTop: 3,
            textTransform: "capitalize",
            opacity: 0.5,
            fontSize: 13,
          }}
        >
          #{currentPatient.idNumber}
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "60%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: fontFamily("en", "Montserrat-Bold"),
              color: "#292929",
              textTransform: "capitalize",
              marginBottom: 5,
              opacity: 0.5,
            }}
          >
            Post
          </Text>
          <Text
            style={{
              fontFamily: fontFamily("en"),
              color: "#292929",
              textTransform: "capitalize",
            }}
          >
            {13}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: fontFamily("en", "Montserrat-Bold"),
              color: "#292929",
              textTransform: "capitalize",
              marginBottom: 5,
              opacity: 0.5,
            }}
          >
            Upcoming
          </Text>
          <Text
            style={{
              fontFamily: fontFamily("en"),
              color: "#292929",
              textTransform: "capitalize",
            }}
          >
            {13}
          </Text>
        </View>
      </View>
    </View>
  );
};

const DetailsContainer = ({ currentPatient }) => {
  const [data, setData] = useState(false);

  const setUpData = () => {
    let d = [];

    //1
    d.push({
      title: "Name",
      label: currentPatient.firstname + " " + currentPatient.lastname,
    });

    //2
    d.push({
      title: "Phone Number",
      label: `(964) ${currentPatient.phoneNumber}`,
    });

    //3
    d.push({
      title: "Registered At",
      label: moment(currentPatient.createdAt).format("llll"),
    });

    //4
    d.push({
      title: "Birthday",
      label: moment(currentPatient.birthdate).format("ll"),
    });

    //5
    d.push({
      title: "Gender",
      label: currentPatient.gender,
    });

    //5
    d.push({
      title: "NUMBER ID",
      label: "#" + currentPatient.idNumber,
    });

    setData(d);
  };

  useEffect(() => {
    if (currentPatient) {
      setUpData();
    }
  }, [currentPatient]);

  return (
    <View style={styles.detailsContainer}>
      {data &&
        data.map((dt, i) => {
          return (
            <View style={{ width: "34%" }} key={i}>
              <Text
                style={{
                  fontFamily: fontFamily("en", "Montserrat-Bold"),
                  color: "#292929",
                  marginBottom: 5,
                  opacity: 0.5,
                }}
              >
                {dt.title}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily("en"),
                  color: "#292929",
                  opacity: 0.9,
                }}
              >
                {dt.label}
              </Text>
            </View>
          );
        })}
    </View>
  );
};

const NoteContainer = () => {
  return (
    <View
      style={{
        width: "33%",
        height: HEIGHT_OF_CONTAINER,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        paddingTop: 30,
      }}
    >
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily("en", "Montserrat-Bold"),
            color: "#292929",
            fontSize: 16,
          }}
        >
          Notes
        </Text>
      </View>
      <View style={styles.noteContentContainer}>
        <Text
          style={{
            fontFamily: fontFamily("en"),
            color: "#292929",
            fontSize: 13,
            opacity: 0.9,
            lineHeight: 20
          }}
        >
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    width: "45%",
    height: HEIGHT_OF_CONTAINER,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginLeft: (-1 * width) / 140,
    padding: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteContentContainer: {
    height: "90%",
    width: "99%",
    alignSelf: "center",
    backgroundColor: Colors.lightBackgroundColor,
    marginTop: 10,
    padding: 15,
  },
});
