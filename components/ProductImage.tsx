import React, { PropsWithoutRef } from "react";
import { Image, StyleSheet } from "react-native";

export default function MyImage(props: PropsWithoutRef<any>) {
  return <Image source={props.source} {...props} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
  },
});
