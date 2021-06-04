import React from "react";
import { PropsWithoutRef } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Text } from "./Themed";

interface MyButtonProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  onPress?: () => void;
  altStyle?: boolean;
  disabled?: boolean;
}

interface ButtonStyles {
  button: StyleProp<ViewStyle>;
  buttonText: StyleProp<TextStyle>;
}

const buttonColors = {
  backgroundColor: {
    default: Colors.colors.red[500],
    altStyle: "transparent",
    disabled: Colors.colors.gray[300],
  },
  color: {
    default: "white",
    altStyle: Colors.colors.red[500],
    disabled: Colors.colors.gray[400],
  },
  borderColor: {
    default: Colors.colors.red[500],
    altStyle: Colors.colors.red[500],
    disabled: Colors.colors.gray[300],
  },
};

export default function MyButton({
  style,
  title,
  altStyle = false,
  disabled,
  ...rest
}: PropsWithoutRef<MyButtonProps>) {
  const currentStyle = getCurrentStyle();
  const btnStyles = buttonStyle(currentStyle);

  function getCurrentStyle() {
    if (disabled) return "disabled";
    if (altStyle) return "altStyle";
    return "default";
  }

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} {...rest}>
      <View style={[btnStyles?.button, style]}>
        <Text style={btnStyles?.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Esta funcion retorna un objeto y me permite pasarle props dentro del componente
const buttonStyle = (
  appliedStyle: "default" | "altStyle" | "disabled"
): ButtonStyles => {
  return {
    button: {
      width: "100%",
      marginVertical: Layout.spacing[1],
      paddingHorizontal: Layout.spacing[1],
      paddingVertical: 3,
      borderColor: buttonColors.borderColor[appliedStyle],
      borderWidth: 2,
      borderRadius: 5,
      backgroundColor: buttonColors.backgroundColor[appliedStyle],
    },
    buttonText: {
      fontSize: 20,
      color: buttonColors.color[appliedStyle],
      textAlign: "center",
    },
  };
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
