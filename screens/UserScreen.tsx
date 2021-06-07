import * as React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import { useCurrentUser } from "../context/User";
import MyButton from "../components/Button";
import CurrentUserAvatar from "../components/CurrentUserAvatar";
import isAuthorized from "../libs/isAuthorized";

export default function UserScreen({ navigation }: any) {
  const { currentUser, userFunctions } = useCurrentUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Info</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoContainer}>
          <CurrentUserAvatar />
          <Text>{currentUser?.displayName || currentUser?.email}</Text>
        </View>

        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <MyButton
            title="Usuario actual"
            onPress={() =>
              alert(
                JSON.stringify(userFunctions.getCurrentSignedInUser(), null, 4)
              )
            }
          />
          {isAuthorized(currentUser!, "admin") && (
            <MyButton
              onPress={() => navigation.push("AdminPanel")}
              title="Panel administrador"
            />
          )}

          {isAuthorized(currentUser!, "admin") && (
            <MyButton
              onPress={() => navigation.push("OrdersList")}
              title="Ver Ordenes"
            />
          )}

          <MyButton
            altStyle
            title="Log out"
            onPress={() => userFunctions.logout()}
          />
        </View>
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
  infoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
