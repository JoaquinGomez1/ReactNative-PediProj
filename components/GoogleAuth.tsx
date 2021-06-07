import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import MyButton from "./Button";
import Colors from "../constants/Colors";
// import firebaseApp from "../config.firebase";
import firebase from "firebase";
import { firebaseConfig } from "../config.firebase";
import { makeRedirectUri } from "expo-auth-session";
import { useCurrentUser } from "../context/User";

WebBrowser.maybeCompleteAuthSession();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function GoogleAuth({ onPressAditional, disabled }: any) {
  const { setCurrentUser } = useCurrentUser();

  // Official expo documentation
  // https://docs.expo.io/guides/authentication/#google
  const [_, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "169631416443-a9lhd47m4pkm8epdigb55fippcp7gr5e.apps.googleusercontent.com",
    iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    androidClientId:
      "169631416443-am9l3tm26km98i1bf2k2lc54ejpak81p.apps.googleusercontent.com",
    webClientId:
      "169631416443-a9lhd47m4pkm8epdigb55fippcp7gr5e.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((user) => {
          if (user) {
            setCurrentUser(user.user!);
          }
        });
    }
  }, [response]);

  const handleLogin = () => {
    promptAsync({ useProxy: true });
    onPressAditional && onPressAditional();
  };

  return (
    <MyButton
      title="Login con google"
      onPress={handleLogin}
      disabled={disabled}
      style={{
        backgroundColor: Colors.colors.blue[400],
        borderColor: Colors.colors.blue[400],
      }}
    />
  );
}
