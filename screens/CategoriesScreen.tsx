import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

import { Text, View } from "../components/Themed";

export default function TabTwoScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.main}>
        <TouchableOpacity onPress={() => navigation.push("CommercesScreen")}>
          <Text style={styles.testLink}>Go Test</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.colors.red[400],
    marginVertical: 20,
  },
  separator: {
    marginBottom: 30,
    height: 1,
    width: "80%",
  },
  main: {
    flex: 1,
  },
  testLink: {
    color: Colors.colors.blue[400],
    fontSize: 18,
  },
});
