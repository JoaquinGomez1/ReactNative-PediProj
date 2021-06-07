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
        if (!email || !password) return null;
        try {
          const { user } = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

          return user;
        } catch (err) {
          alert(err);
          return null;
        }
      },
      logout: () => {
        firebase.auth().signOut();
        setCurrentUser({});
      },
      signup: async (user: User, password) => {
        try {
          const returnedUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, password);
          setCurrentUser({ ...returnedUser.user, isLoggedIn: true });
        } catch (err) {
          alert(err);
        }
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
