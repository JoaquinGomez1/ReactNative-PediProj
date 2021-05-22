import React from "react";
import { CartProvider } from "./Cart";
import { UserProvider } from "./User";

export default function ContextProvider(props: any) {
  return (
    <UserProvider>
      <CartProvider>{props.children}</CartProvider>
    </UserProvider>
  );
}
