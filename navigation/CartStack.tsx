import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import ShoppingCart from "../screens/ShoppingCartScreen";

const CartStack = createStackNavigator();
export function CartNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        options={{ headerTitle: "Carrito" }}
        component={ShoppingCart}
      />
    </CartStack.Navigator>
  );
}
