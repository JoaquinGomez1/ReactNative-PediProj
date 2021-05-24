import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import { View } from "../components/Themed";

export default function TabTwoScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.colors.red[500]} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  testLink: {
    color: Colors.colors.blue[400],
    fontSize: 18,
  },
});
