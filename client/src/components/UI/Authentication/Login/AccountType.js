import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const AccountType = ({ types, currentType, color, onChangeType }) => {
  const onPress = (val) => {
    onChangeType(val);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      {types.map((a) => {
        return (
          <TouchableOpacity
            key={a.type}
            style={styles.typeContainer}
            onPress={onPress.bind(this, a.type)}
            style={{
              borderWidth: 0.8,
              borderColor:
                currentType === a.type ? color : "rgba(29,29,29,0.3)",
              padding: 3,
              paddingHorizontal: 25,
            }}
          >
            <Text
              style={{
                fontFamily:
                  currentType === a.type
                    ? "Montserrat-Bold"
                    : "Montserrat-Light",
                fontSize: 15,
                color: currentType === a.type ? color : "rgba(29,29,29,0.4)",
              }}
            >
              {a.label.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AccountType;

const styles = StyleSheet.create({
  typeContainer: {
    alignItems: "center",
  },
});
