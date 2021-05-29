import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

import MyButton from "../components/Button";

export default function ManageCommercesScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar comercios</Text>

      <View style={styles.actionsContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
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
  actionsContainer: {
    width: "100%",
  },
});
