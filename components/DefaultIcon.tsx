import { FontAwesome5 } from "@expo/vector-icons";
import React, { PropsWithRef } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

interface IconProps {
  iconName: string;
  style?: StyleProp<ViewStyle>;
}

export default function Icon({ iconName, style }: PropsWithRef<IconProps>) {
  return (
    <View style={[styles.iconContainer]}>
      <FontAwesome5 style={[styles.icon, style]} name={iconName} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 50,
  },
  icon: {
    fontSize: 22,
    color: Colors.colors.gray[700],
    textAlign: "center",
  },
});
