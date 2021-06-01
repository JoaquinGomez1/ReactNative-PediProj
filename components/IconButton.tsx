import React, { PropsWithRef } from "react";
import { View, Text } from "./Themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "./DefaultIcon";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import Layout from "../constants/Layout";

interface IconButtonProps {
  onPress?: () => void;
  iconName: string;
  displayText: string | number;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function IconButton({
  onPress,
  iconName,
  displayText,
  style,
  iconStyle,
  textStyle,
}: PropsWithRef<IconButtonProps>) {
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity style={[styles.addButton, style]} onPress={onPress}>
        <Icon style={iconStyle} iconName={iconName} />
        <Text style={[styles.addButtonText, textStyle]}> {displayText} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // The UI of this component should be Color agnostic.
  // Colors should be customized on parent element
  addButton: {
    marginVertical: Layout.spacing[2],
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: Layout.spacing[1],
    paddingHorizontal: Layout.spacing[2],
    borderRadius: 50,
    position: "relative",
    borderWidth: 2,
    elevation: 2,
  },
  addButtonText: {
    textAlign: "center",
    fontSize: 20,
    width: "100%",
  },
  iconStyles: {},
});
