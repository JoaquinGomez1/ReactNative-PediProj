import { FontAwesome5 } from "@expo/vector-icons";
import React, { PropsWithRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import { View, Text } from "./Themed";

interface BadgeProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  iconName?: string;
  onPress?: () => void;
}

export default function Badge({
  text,
  style,
  iconName,
  onPress,
}: PropsWithRef<BadgeProps>) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 style={styles.icon} name={iconName || "hamburger"} />
          </View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: Colors.colors.red[600],
    paddingHorizontal: 15,
    borderRadius: 50,
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: 32,
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  icon: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
