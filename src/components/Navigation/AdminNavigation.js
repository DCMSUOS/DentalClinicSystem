import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontFamily, fontSize } from "../../assets/FontStyleConfig";
import { NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";

const AdminNavigation = () => {
  return (
    <View>

      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/dashboard"
      >
        <FaUserTie
          color="#fff"
          size={19}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"Dashboard"}
      </NavLink>

      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/createUser"
      >
        <FaUserTie
          color="#fff"
          size={19}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"Create User"}
      </NavLink>

      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/patients"
      >
        <FaUserTie
          color="#fff"
          size={19}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"Patients List"}
      </NavLink>

      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/features"
      >
        <FaUserTie
          color="#fff"
          size={19}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"Features"}
      </NavLink>
    </View>
  );
};

const style = {
  fontFamily: fontFamily("en", "Montserrat-Regular"),
  fontSize: fontSize("en", 15),
};

export default AdminNavigation;

const styles = StyleSheet.create({});
