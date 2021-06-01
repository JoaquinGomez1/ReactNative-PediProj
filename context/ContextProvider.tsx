import React from "react";
import { CartProvider } from "./Cart";
import { ProductsProvider } from "./Products";
import { UserProvider } from "./User";

export default function ContextProvider(props: any) {
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>{props.children}</CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
}
