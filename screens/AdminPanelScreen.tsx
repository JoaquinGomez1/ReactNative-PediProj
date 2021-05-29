import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useCurrentUser } from "../context/User";
import MyButton from "../components/Button";

export default function UserScreen({ navigation }: any) {
  const { currentUser, userFunctions } = useCurrentUser();

  React.useEffect(() => {
    if (!currentUser || !Object.keys(currentUser)) {
      navigation.navigate("Home");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin panel</Text>

      <View style={styles.actionsContainer}>
        <MyButton
          onPress={() => navigation.navigate("ManageProducts")}
          title="Gestionar platos"
        />
        <MyButton
          onPress={() => navigation.navigate("ManageCommerces")}
          title="Gestionar comercios"
        />
      </View>
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
