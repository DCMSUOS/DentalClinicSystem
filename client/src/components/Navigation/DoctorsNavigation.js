import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontFamily, fontSize } from "../../assets/FontStyleConfig";
import { NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";

const DoctorsNavigation = () => {
  return (
    <NavLink
      className="navLink"
      activeClassName="navLinkActive"
      style={style}
      to="/doctor"
    >
      <FaUserTie
        color="#fff"
        size={19}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
      {"doctors"}
    </NavLink>
  );
};

const style = {
  fontFamily: fontFamily("en", "Montserrat-Regular"),
  fontSize: fontSize("en", 15),
};

export default DoctorsNavigation;

const styles = StyleSheet.create({});
