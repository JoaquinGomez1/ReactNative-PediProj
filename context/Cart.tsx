import React, { createContext, useMemo, useState, useContext } from "react";
import { CartActions, CartState, Product } from "../types";

const CartContext = createContext<CartState>(undefined!);

export function CartProvider(props: any) {
  const [cart, setCart] = useState<Product[] | []>([]);
  const cartFunctions = useMemo<CartActions>(
    () => ({
      addToCart: (product) => {
        // alert(JSON.stringify(cart, null, 4));
        const itemIndex = cart.findIndex((each) => each.id === product.id);
        const itemExists = itemIndex !== -1;
        setCart((prevCart) =>
          itemExists ? [...prevCart] : [...prevCart, product]
        );
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
    [cart]
  );

  return (
    <CartContext.Provider {...props} value={{ cartFunctions, cart }}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart(): CartState {
  const context = useContext<CartState>(CartContext);
  if (!context) throw new Error("Use this hook inside a Cart Provider");

  return context;
}

export default CartContext;
