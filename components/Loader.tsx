import React, { PropsWithRef } from "react";
import { ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";

interface LoaderProps {
  size?: number | "large" | "small";
  color?: string;
}

export default function Loader({ color, size }: PropsWithRef<LoaderProps>) {
  return (
    <ActivityIndicator
      color={color || Colors.colors.red[400]}
      size={size || "large"}
    />
  );
}
