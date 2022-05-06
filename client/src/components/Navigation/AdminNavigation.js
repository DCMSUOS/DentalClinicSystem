import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontFamily, fontSize } from "../../assets/FontStyleConfig";
import { NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { MdSpaceDashboard, MdOutlineMoreHoriz } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { HiDocumentReport } from "react-icons/hi";

const AdminNavigation = () => {
  return (
    <View>
      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/dashboard"
      >
        <MdSpaceDashboard
          color="#fff"
          size={22}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"Dashboard"}
      </NavLink>

      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/patients"
      >
        <ImUsers
          color="#fff"
          size={21}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"Patients List"}
      </NavLink>
      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/reports"
      >
        <HiDocumentReport
          color="#fff"
          size={23}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"Reports"}
      </NavLink>
      <NavLink
        className="navLink"
        activeClassName="navLinkActive"
        style={style}
        to="/features"
      >
        <MdOutlineMoreHoriz
          color="#fff"
          size={24}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {"More"}
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
