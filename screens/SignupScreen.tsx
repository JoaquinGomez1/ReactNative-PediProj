import * as React from "react";
import { LayoutAnimation, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import MyButton from "../components/Button";
import { useCurrentUser } from "../context/User";
import { User } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../constants/Layout";

export default function SignupScreen({ navigation }: any) {
  const { userFunctions } = useCurrentUser();
  const [password, setPassword] = React.useState("");
  const [currentUserData, setCurrentUserData] = React.useState<User>({
    username: "",
    email: "",
    address: "",
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Registrate</Text>
        <Text style={styles.subtitle}>
          Empezá a buscar tus productos favoritos
        </Text>
      </View>
      <View style={styles.container}>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={{ width: "100%", paddingHorizontal: Layout.spacing[3] }}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            onChangeText={(text) =>
              setCurrentUserData({ ...currentUserData, username: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) =>
              setCurrentUserData({ ...currentUserData, email: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Direccion"
            onChangeText={(text) =>
              setCurrentUserData({ ...currentUserData, address: text })
            }
          />
          <TextInput
            style={styles.input}
            autoCompleteType="password"
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            autoCompleteType="password"
            placeholder="Confirmar Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <MyButton
            title="Registrarse"
            onPress={() => userFunctions.signup(currentUserData, password)}
          />
        </View>
        <View style={styles.bottomInfo}>
          <Text style={styles.bottomInfoText}>¿Ya tenés una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={[styles.bottomInfoText, { color: Colors.colors.red[600] }]}
            >
              Logueate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.colors.gray[400],
  },
  separator: {
    marginBottom: 30,
    height: 2,
    width: "80%",
  },
  testLink: {
    color: Colors.colors.blue[400],
    fontSize: 18,
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "100%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.colors.gray[300],
  },
  bottomInfo: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomInfoText: {
    fontSize: 16,
  },
  header: {
    paddingHorizontal: Layout.spacing[3],
    justifyContent: "center",
    height: 180,
  },
});
