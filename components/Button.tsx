import React from "react";
import { PropsWithoutRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import { Text } from "./Themed";

interface MyButtonProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  onPress: () => void;
}

export default function MyButton({
  style,
  title,
  ...rest
}: PropsWithoutRef<MyButtonProps>) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={style || styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    width: "100%",
    textAlign: "center",
    marginVertical: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderColor: Colors.colors.red[500],
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: Colors.colors.red[500],
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
