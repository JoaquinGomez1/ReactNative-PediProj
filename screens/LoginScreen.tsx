import * as React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import { Text, View } from "../components/Themed";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MyButton from "../components/Button";
import { useCurrentUser } from "../context/User";
import GoogleAuth from "../components/GoogleAuth";

export default function LoginScreen({ navigation }: any) {
  const { userFunctions } = useCurrentUser();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleLogin = (email: string, password: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid) {
      alert("Invalid email");
      return;
    }

    userFunctions.login(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Pedi-Proj</Text>
      {}
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255, 255, 255, 0.1)"
      />
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          autoCompleteType="password"
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <MyButton title="Login" onPress={() => handleLogin(email, password)} />
        <Text style={{ textAlign: "center", marginBottom: 10 }}>Or</Text>
        <GoogleAuth />
      </View>
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomInfoText}>Todavia no tenes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text
            style={[styles.bottomInfoText, { color: Colors.colors.red[600] }]}
          >
            Registrate
          </Text>
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
  mainTitle: { color: Colors.colors.red[400], fontSize: 32 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
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
    justifyContent: "center",
  },
  bottomInfoText: {
    fontSize: 16,
  },
});
