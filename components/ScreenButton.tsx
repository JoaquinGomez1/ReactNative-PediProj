import React from "react";
import { PropsWithoutRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { Text } from "./Themed";

export default function ScreenButton(props: PropsWithoutRef<any>) {
  return (
    <TouchableOpacity {...props}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    marginVertical: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderColor: Colors.colors.red[500],
    borderWidth: 2,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    color: Colors.colors.red[500],
  },
});
