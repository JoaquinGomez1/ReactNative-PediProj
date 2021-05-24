import React, { createContext, useContext, useMemo, useState } from "react";
import { User, UserActions, UserState } from "../types";
import firebase from "../config.firebase";

const UserContext = createContext<UserState>(undefined!);
export default UserContext;

export function UserProvider(props: any) {
  const [currentUser, setCurrentUser] = useState<UserState | {}>({});
  const userFunctions = useMemo<UserActions>(
    () => ({
      login: async (email, password) => {
        if (!email || !password) return;

        firebase.auth().signInWithEmailAndPassword(email, password);
        const currentAuthUser = firebase.auth().currentUser;
        setCurrentUser({ ...currentAuthUser, isLoggedIn: true });
      },
      loginWithFirebase: () => {
        const googleUser = firebase.auth().currentUser;
        if (googleUser) {
          // setCurrentUser(googleUser);
          console.log(googleUser);
        } else {
          console.log("No google user logged in: ", googleUser);
          return;
        }
      },
      logout: () => {
        firebase.auth().signOut();
        setCurrentUser({});
      },
      signup: async (user: User, password) => {
        const userCredentials = firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, password);
        console.log(userCredentials);
        setCurrentUser({ ...user, isLoggedIn: true });
      },
      getCurrentSignedInUser: () => {
        return firebase.auth().currentUser;
      },
    }),

    [currentUser]
  );

  return (
    <UserContext.Provider
      {...props}
      value={{ currentUser, userFunctions, setCurrentUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export function useCurrentUser(): UserState {
  const context = useContext<UserState>(UserContext);
  if (!context) throw new Error("Use this hook inside a Cart Provider");

  return context;
}
