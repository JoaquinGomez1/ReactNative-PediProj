import * as React from "react";
import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import MyButton from "../components/Button";
import { useCurrentUser } from "../context/User";
import GoogleAuth from "../components/GoogleAuth";
import LottieView from "lottie-react-native";
import Layout from "../constants/Layout";
import { emailRegex } from "../constants/Common";

export default function LoginScreen({ navigation }: any) {
  const { userFunctions, setCurrentUser } = useCurrentUser();

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [animationStarted, setAnimationStarted] = React.useState(false);

  const animationPassed = React.useRef<LottieView>(null);
  const ANIM_DURATION = 2.2 * 1000; // 2.2 Secs

  const handleLogin = (email: string, password: string) => {
    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid) {
      alert("Invalid email");
      return;
    }

    setAnimationStarted(true);
    animationPassed?.current?.play(0, 59);

    userFunctions.login(email, password).then((user) => {
      if (!user) {
        animationPassed && animationPassed?.current?.play(59, 120);

        // Wait for animation to complete and then set the current user
        setTimeout(() => {
          setAnimationStarted(false);
          setCurrentUser(user!);
        }, ANIM_DURATION);
      } else {
        setAnimationStarted(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Pedi-Proj</Text>
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255, 255, 255, 0.1)"
      />

      <View style={LottieStyles(animationStarted).container}>
        <LottieView
          style={LottieStyles(animationStarted).animation}
          ref={animationPassed}
          source={require("../assets/lottie/loading-passed.json")}
          autoPlay={false}
          loop={false}
        />
      </View>

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
        <Text style={{ textAlign: "center", marginBottom: 10 }}>O sino</Text>
        <GoogleAuth />
      </View>
      <View style={styles.bottomInfo}>
        <Text style={styles.bottomInfoText}>Todavía no tenés una cuenta?</Text>
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

function LottieStyles(animationStarted: boolean) {
  return {
    container: {
      position: "absolute" as "absolute", // ←- Weird bug but ok
      width: animationStarted ? "100%" : 0,
      height: animationStarted ? "100%" : 0,
      zIndex: 99,
    },
    animation: {
      width: animationStarted ? 240 : 0,
      height: animationStarted ? 240 : 0,
      top: Layout.window.height / 6,
      left: Layout.window.width / 10,
    },
  };
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
