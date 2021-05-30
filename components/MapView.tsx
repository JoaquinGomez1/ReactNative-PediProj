// https://docs.expo.io/versions/latest/sdk/map-view/

import * as React from "react";
import MapView, { MapViewProps } from "react-native-maps";
import { StyleSheet, Dimensions, ViewStyle, StyleProp } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import { InitialRegion } from "../constants/MockData";

interface MapProps {
  style?: StyleProp<ViewStyle>;
  mapStyle?: StyleProp<ViewStyle>;
}

export default function Map({
  style,
  mapStyle,
  ...rest
}: React.PropsWithChildren<MapProps>) {
  return (
    <View style={[styles.container, style]}>
      <MapView
        {...rest}
        initialRegion={InitialRegion}
        style={[styles.map, mapStyle]}
      />
    </View>
  );
}
interface ComponentStyles {
  container: StyleProp<ViewStyle>;
  map: StyleProp<ViewStyle>;
}

const styles: ComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width - 40, // -40 for padding
    height: 230,
  },
});
