import React, { createContext, useMemo, useState, useContext } from "react";
import { CartActions, CartState, Product } from "../types";

const CartContext = createContext<CartState>(undefined!);

export function CartProvider(props: any) {
  const [cart, setCart] = useState<Product[] | any[]>([]);
  const cartFunctions = useMemo<CartActions>(
    () => ({
      addToCart: (product: Product) => {
        const productCopy = { ...product };
        const itemIndex = cart.findIndex((each) => each.id === productCopy.id);
        const itemDoesNotExists = itemIndex === -1;

        if (itemDoesNotExists) {
          productCopy.maxUnits = productCopy.units;
          productCopy.units = 1;
          setCart((prevCart) => [...prevCart, productCopy]);
        } else {
          const cartCopy = [...cart];
          cartCopy[itemIndex].units += 1;
          setCart(cartCopy);
        }
      },
      deleteFromCart: (id) => {
        setCart((prevCart: Product[]) => [
          ...prevCart.filter((product: Product) => product.id !== id),
        ]);
      },
      clearCart: (): void => {
        setCart([]);
      },
      getCartTotal: () => {
        // https://github.com/microsoft/TypeScript/issues/36390#issuecomment-641718624
        // cannot use cart.reduce directly for now
        return (cart as Product[]).reduce(
          (acc, { price, units }) => acc + units * price,
          0
        );
      },
      setProductQuantity: (ammount, id) => {
        if (ammount < 1) {
          cartFunctions.deleteFromCart(id);
          return;
        }
        const cartCopy = [...cart];
        const searchedProductIndex = cart.findIndex(
          (product) => product.id === id
        );
        cartCopy[searchedProductIndex].units = ammount;

        setCart(cartCopy);
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
