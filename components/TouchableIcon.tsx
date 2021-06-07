import React, { PropsWithRef } from "react";
import {
  StyleProp,
  TouchableOpacity,
  TextStyle,
} from "react-native";
import Icon from "./DefaultIcon";

interface TouchableIconProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
}

export default function TouchableIcon({
  iconName,
  onPress,
  style,
  ...rest
}: PropsWithRef<TouchableIconProps>) {
  return (
    <TouchableOpacity {...rest} onPress={onPress}>
      <Icon iconName={iconName} style={style} />
    </TouchableOpacity>
  );
}
