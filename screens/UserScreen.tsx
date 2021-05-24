import * as React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import { Text, View } from "../components/Themed";
import { useCurrentUser } from "../context/User";
import MyButton from "../components/Button";

export default function UserScreen({ navigation }: any) {
  const { currentUser, userFunctions } = useCurrentUser();
  const googleUser = userFunctions.getCurrentSignedInUser();

  // TODO: Figure out a way to combine google user and current user so that there is only one possible user

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Info</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{currentUser.username || googleUser?.email}</Text>
      <Text>{currentUser.email}</Text>
      <Text>{currentUser.address}</Text>

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <MyButton
          title="Get current user"
          onPress={() =>
            alert(
              JSON.stringify(userFunctions.getCurrentSignedInUser(), null, 4)
            )
          }
        />
        <MyButton title="Log out" onPress={() => userFunctions.logout()} />
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
