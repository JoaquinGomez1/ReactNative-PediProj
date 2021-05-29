import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useCurrentUser } from "../context/User";
import MyButton from "../components/Button";

export default function AdminPanel({ navigation }: any) {
  const { currentUser } = useCurrentUser();

  React.useEffect(() => {
    if (!currentUser || !Object.keys(currentUser)) {
      navigation.navigate("Home");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin panel</Text>
      <View style={styles.subtitleArea}>
        <Text style={styles.subtitle}>
          Bienvenido al panel de administradores
        </Text>
        <Text style={styles.subheader}>
          Desde acá podés gestionar tus comercios adheridos y productos
        </Text>
      </View>

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
  subtitleArea: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  subheader: {
    textAlign: "center",
  },
});
