import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import InfoScreen from "../screens/InfoScreen";
import TestingScreen from "../screens/TestingScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import ProductDetail from "../screens/ProductDetail";
import ShoppingCart from "../screens/ShoppingCart";
import { StyleSheet, Text } from "react-native";
import { useCart } from "../context/Cart";
import { useCurrentUser } from "../context/User";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import UserScreen from "../screens/UserScreen";
import firebaseApp from "../config.firebase";
import LoadingScreen from "../screens/LoadingScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

type NavigatorArrayContent = {
  name: keyof BottomTabParamList;
  component: React.ComponentType;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  auth?: boolean;
};

const authNavigators: Array<NavigatorArrayContent> = [
  { name: "Home", component: TabOneNavigator, iconName: "home", auth: true },
  {
    name: "Categories",
    component: TabTwoNavigator,
    iconName: "folder-open",
    auth: true,
  },
  { name: "Cart", component: CartNavigator, iconName: "cart", auth: true },
  { name: "User", component: UserScreen, iconName: "person", auth: true },
  { name: "Login", component: LoginScreen, iconName: "log-in", auth: false },
  { name: "SignUp", component: SignupScreen, iconName: "create", auth: false },
];

export default function BottomTabNavigator() {
  const { setCurrentUser } = useCurrentUser();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading] = React.useState(false);
  const [authService] = React.useState(firebaseApp.auth());

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user !== null) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [authService]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors.colors.red[500] }}
    >
      {isLoading ? (
        <BottomTab.Screen
          key={"loadingscreen"}
          name="Loading"
          component={LoadingScreen}
        />
      ) : (
        authNavigators?.map(
          ({ name, component, iconName, auth }) =>
            isLoggedIn === auth && (
              <BottomTab.Screen
                key={name}
                name={name!}
                component={component!}
                options={{
                  tabBarIcon: ({ color }) =>
                    name === "Cart" ? (
                      <CartIcon color={color} />
                    ) : (
                      <TabBarIcon name={iconName} color={color} />
                    ),
                  title: name,
                }}
              />
            )
        )
      )}
    </BottomTab.Navigator>
  );
}

function CartIcon({ color }: any) {
  const { cart } = useCart();

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
    right: 20,
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
        component={HomeScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <TabOneStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: true, headerTitle: "Producto" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="InfoScreen"
        component={InfoScreen}
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
