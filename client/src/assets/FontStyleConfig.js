import { Dimensions } from "react-native";

export const TextAlign = language => {
  if (language === "en") {
    return "left";
  } else {
    return "right";
  }
};

export const fontFamily = (language, en) => {
  if (!en) {
    return language === "en" ? "Montserrat-Medium" : "Rudaw-Regular";
  }
  if (language === "en") {
    return en;
  } else {
    return "Rudaw-Regular";
  }
};

export const fontSizeWithBebas = (language, size) => {
  if (language === "en") return size * 1.5;
  else return size;
};

export const fontSize = (language, size) => {
  if (language === "en") {
    return size;
  } else {
    return size + size / 10;
  }
};
