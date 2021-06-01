import React, { PropsWithoutRef } from "react";
import { Image, StyleSheet } from "react-native";

export default function MyImage(props: PropsWithoutRef<any>) {
  return (
    <Image
      source={props.source}
      {...props}
      style={[styles.image, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    aspectRatio: 21 / 9,
  },
});
