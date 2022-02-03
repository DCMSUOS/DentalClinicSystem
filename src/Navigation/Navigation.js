import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import firebase from "../db/firebase";
import * as FontStyle from "../assets/FontStyleConfig";
import { logoutUser } from "../store/action/authentication";
import CoachNavigation from "../components/Navigation/CoachNavigation";
import StoreNavigation from "../components/Navigation/StoreNavigation";
import AdminNavigation from "../components/Navigation/AdminNavigation";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.Authentication.user);

  const onLogout = async () => {
    try {
      dispatch(logoutUser());
      localStorage.clear();
      sessionStorage.clear();
      await firebase.auth().signOut();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <BadgeContainer />
      {type === "Coach" && <CoachNavigation />}
      {type === "Admin" && <AdminNavigation />}
      {type === "Store" && <StoreNavigation />}

      <div style={{ position: "relative", flex: 1 }}>
        <LogoutButton onLogout={onLogout} />
      </div>
    </View>
  );
};

const BadgeContainer = () => {
  return (
    <NavLink
      to='/'
      style={{
        display: "flex",
        justifyContent: "center",
        borderBottom: ".5px solid rgba(256,256,256,0.2)",
        textDecoration: "none",
      }}>
      <Text style={styles.badgeTextContainer}>BULLHEAD</Text>
    </NavLink>
  );
};

const LogoutButton = ({ onLogout }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  return (
    <View
      style={{
        position: "absolute",
        bottom: 40,
        width: "100%",
      }}>
      <Link
        className='navLink'
        style={{
          fontFamily: FontStyle.fontFamily(language, "Montserrat-Light"),
          fontSize: FontStyle.fontSize(language, 14),
        }}
        activeClassName='navLinkActive'
        onClick={onLogout}
        to='#'>
        <FiLogOut
          color='#fff'
          size={22}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {t("logout")}
      </Link>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b74ac",
    minHeight: Dimensions.get("screen").height / 2,
    paddingTop: 10,
  },
  BadgeContainer: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(256,256,256,0.2)",
  },
  badgeTextContainer: {
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
});
