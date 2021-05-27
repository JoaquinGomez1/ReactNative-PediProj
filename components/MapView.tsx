// https://docs.expo.io/versions/latest/sdk/map-view/

import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import { InitialRegion } from "../constants/MockData";

export default function Map(props: any) {
  return (
    <View style={styles.container}>
      <MapView {...props} initialRegion={InitialRegion} style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
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
