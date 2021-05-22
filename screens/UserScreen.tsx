import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

import { Text, View } from "../components/Themed";
import { useCurrentUser } from "../context/User";
import MyButton from "../components/Button";

export default function TabTwoScreen({ navigation }: any) {
  const { currentUser, userFunctions } = useCurrentUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Info</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{currentUser.username}</Text>
      <Text>{currentUser.email}</Text>
      <Text>{currentUser.address}</Text>

      <MyButton title="Log out" onPress={() => userFunctions.logout()} />
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
