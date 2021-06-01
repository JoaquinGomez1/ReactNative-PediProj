import { FontAwesome5 } from "@expo/vector-icons";
import React, { PropsWithRef } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Colors from "../constants/Colors";

interface IconProps {
  iconName: string;
  style?: StyleProp<TextStyle>;
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
    backgroundColor: "transparent",
    alignItems: "center",
  },
  icon: {
    fontSize: 22,
    color: Colors.colors.gray[700],
    textAlign: "center",
  },
});
