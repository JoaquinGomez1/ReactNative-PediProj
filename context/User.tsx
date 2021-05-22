import React, { createContext, useContext, useMemo, useState } from "react";
import { User, UserActions, UserState } from "../types";

const UserContext = createContext<UserState>(undefined!);

export function UserProvider(props: any) {
  const [currentUser, setCurrentUser] = useState<UserState | {}>({});
  const userFunctions = useMemo<UserActions>(
    () => ({
      login: (user: User) => {
        setCurrentUser(user);
      },
      logout: () => {
        setCurrentUser({});
      },
      signup: (user: User) => {
        setCurrentUser(user);
      },
    }),
    [currentUser]
  );

  return (
    <UserContext.Provider {...props} value={{ currentUser, userFunctions }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useCurrentUser(): UserState {
  const context = useContext<UserState>(UserContext);
  if (!context) throw new Error("Use this hook inside a Cart Provider");

  return context;
}

export default UserContext;
