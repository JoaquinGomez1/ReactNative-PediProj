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
  onPress: () => void;
  altStyle?: boolean;
  disabled?: boolean;
}

interface ButtonStyles {
  button: StyleProp<ViewStyle>;
  buttonText: StyleProp<TextStyle>;
}

export default function MyButton({
  style,
  title,
  altStyle = false,
  disabled,
  ...rest
}: PropsWithoutRef<MyButtonProps>) {
  const btnStyles = buttonStyle(altStyle);

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} {...rest}>
      <View style={[btnStyles?.button, style]}>
        <Text style={btnStyles?.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Esta funcion retorna un objeto y me permite pasarle props dentro del componente
const buttonStyle = (altStyle: any): ButtonStyles => {
  return {
    button: {
      width: "100%",
      marginVertical: Layout.spacing[1],
      paddingHorizontal: Layout.spacing[1],
      paddingVertical: 3,
      borderColor: Colors.colors.red[500],
      borderWidth: 2,
      borderRadius: 5,
      backgroundColor: altStyle ? "transparent" : Colors.colors.red[500],
    },
    buttonText: {
      fontSize: 20,
      color: altStyle ? Colors.colors.red[500] : "white",
      textAlign: "center",
    },
  };
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
