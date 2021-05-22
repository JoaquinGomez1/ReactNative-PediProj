import React from "react";
import { PropsWithoutRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Text } from "./Themed";

export default function MyButton(props: PropsWithoutRef<any>) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderColor: Colors.colors.red[500],
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 15,
    color: Colors.colors.red[500],
  },
});
