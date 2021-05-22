/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TestingScreen from "../screens/TestingScreen";
import {
  BottomTabParamList,
  Product,
  State,
  TabOneParamList,
  TabTwoParamList,
} from "../types";
import ProductDetail from "../screens/ProductDetail";
import ShoppingCart from "../screens/ShoppingCart";
import { StyleSheet, Text } from "react-native";
import cartContext from "../context/Cart";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { cart } = React.useContext<State>(cartContext);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors.colors.red[500] }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          title: "Home",
        }}
      />
      <BottomTab.Screen
        name="Info"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          title: "Info",
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => <CartIcon color={color} cart={cart} />,
          title: "Cart",
        }}
      />
    </BottomTab.Navigator>
  );
}

function CartIcon({ color, cart }: any) {
  return (
    <>
      <Text style={styles.text}>{cart?.length}</Text>
      <TabBarIcon name="cart" color={color} />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    right: 40,
    backgroundColor: Colors.colors.red[500],
    borderRadius: 100,
    width: 20,
    height: 20,
    textAlign: "center",
    color: "white",
  },
});

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator screenOptions={{ headerShown: false }}>
      <TabOneStack.Screen
        name="Home"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <TabOneStack.Screen name="ProductDetail" component={ProductDetail} />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
      <TabTwoStack.Screen
        name="TabTwoTest"
        component={TestingScreen}
        options={{ title: " My little poli" }}
      />
    </TabTwoStack.Navigator>
  );
}

const CartStack = createStackNavigator();

function CartNavigator() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="Cart"
        options={{ headerTitle: "Shopping Cart" }}
        component={ShoppingCart}
      />
    </CartStack.Navigator>
  );
}
