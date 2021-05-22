import React, { useMemo, useState } from "react";
import { CartActions, Product } from "../types";
import CartContext from "./Cart";

export default function ContextProvider(props: any) {
  const [cart, setCart] = useState<Product[] | []>([]);
  const cartFunctions = useMemo<CartActions>(
    () => ({
      addToCart: (product) => {
        setCart((prevCart) => [...prevCart, product]);
      },
      deleteFromCart: (id) => {
        setCart((prevCart: Product[]) => [
          ...prevCart.filter((product: Product) => product.id !== id),
        ]);
      },
      clearCart: (): void => {
        setCart([]);
      },
    }),
    []
  );

  return (
    <CartContext.Provider {...props} value={{ cartFunctions, cart }}>
      {props.children}
    </CartContext.Provider>
  );
}
