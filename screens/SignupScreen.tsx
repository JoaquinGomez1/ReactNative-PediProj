import * as React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import { Text, View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import MyButton from "../components/Button";
import { useCurrentUser } from "../context/User";
import { mockUser } from "../constants/MockData";
import { User } from "../types";

export default function SignupScreen({ navigation }: any) {
  const { userFunctions } = useCurrentUser();
  const [password, setPassword] = React.useState("");
  const [currentUserData, setCurrentUserData] = React.useState<User>({
    username: "",
    email: "",
    address: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
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
          placeholder="Address"
          onChangeText={(text) =>
            setCurrentUserData({ ...currentUserData, address: text })
          }
        />
        <TextInput
          style={styles.input}
          autoCompleteType="password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <MyButton
          title="Sign Up"
          onPress={() => userFunctions.signup(currentUserData, password)}
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
  input: {
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "100%",
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.colors.gray[300],
  },
});
