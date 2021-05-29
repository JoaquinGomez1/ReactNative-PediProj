import React, { PropsWithRef } from "react";
import { StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import Icon from "./DefaultIcon";

interface TouchableIconProps {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
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
