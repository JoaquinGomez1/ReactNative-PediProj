import React from "react";
import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

import MyButton from "./Button";
import Colors from "../constants/Colors";
import { useCurrentUser } from "../context/User";
// import firebaseApp from "../config.firebase";
import firebase from "firebase";
import firebaseApp from "../config.firebase";

WebBrowser.maybeCompleteAuthSession();

const provider = new firebase.auth.GoogleAuthProvider();

export default function GoogleAuth({ onPressAditional, disabled }: any) {
  const { userFunctions } = useCurrentUser();
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     "169631416443-a9lhd47m4pkm8epdigb55fippcp7gr5e.apps.googleusercontent.com",
  //   iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  //   androidClientId:
  //     "169631416443-am9l3tm26km98i1bf2k2lc54ejpak81p.apps.googleusercontent.com",
  //   webClientId:
  //     "169631416443-a9lhd47m4pkm8epdigb55fippcp7gr5e.apps.googleusercontent.com",
  // });

  const handleLogin = () => {
    // if (disabled) {
    //   alert("Esperando implementación");
    //   return;
    // }
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // const credential = result.credential!;
        // This gives you a Google Access Token, can be used to access the Google API.
        // var token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });

    onPressAditional && onPressAditional();
  };

  // React.useEffect(() => {
  //   if (response?.type === "success") {
  //     userFunctions?.loginWithFirebase();
  //   }
  // }, [response]);

  return (
    <MyButton
      style={{
        padding: 3,
        backgroundColor: Colors.colors.blue[400],
        alignItems: "center",
        borderRadius: 8,
        borderColor: Colors.colors.blue[400],
      }}
      title="Login con google"
      onPress={handleLogin}
    />
  );
}
