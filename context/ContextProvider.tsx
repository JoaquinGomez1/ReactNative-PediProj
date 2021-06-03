import React from "react";
import { CartProvider } from "./Cart";
import { CommercesProvider } from "./Commerces";
import { ProductsProvider } from "./Products";
import { UserProvider } from "./User";

export default function ContextProvider(props: any) {
  return (
    <UserProvider>
      <CommercesProvider>
        <ProductsProvider>
          <CartProvider>{props.children}</CartProvider>
        </ProductsProvider>
      </CommercesProvider>
    </UserProvider>
  );
}
