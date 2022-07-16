import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import { BottomTabParamList, TabOneParamList } from "../types";
import ProductDetail from "../screens/ProductDetailScreen";
import { StyleSheet, Text } from "react-native";
import { useCart } from "../context/Cart";
import { useCurrentUser } from "../context/User";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import LoadingScreen from "../screens/LoadingScreen";
import { UserNavigator } from "./UserStack";
import { CartNavigator } from "./CartStack";
import { CategoriesNavigator } from "./CategoriesStack";

const DefaultTab = createBottomTabNavigator<BottomTabParamList>();

type NavigatorArrayContent = {
  name: keyof BottomTabParamList;
  component: React.ComponentType;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  auth?: boolean;
};

const appNavigators: Array<NavigatorArrayContent> = [
  { name: "Home", component: HomeNavigator, iconName: "home", auth: true },
  {
    name: "Commerces",
    component: CategoriesNavigator,
    iconName: "folder-open",
    auth: true,
  },
  { name: "Cart", component: CartNavigator, iconName: "cart", auth: true },
  { name: "User", component: UserNavigator, iconName: "person", auth: true },
  { name: "Login", component: LoginScreen, iconName: "log-in", auth: false },
  { name: "SignUp", component: SignupScreen, iconName: "create", auth: false },
];

export default function BottomTabNavigator() {
  const { currentUser } = useCurrentUser();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading] = React.useState(false);

  React.useEffect(() => {
    currentUser && setIsLoggedIn(!!currentUser.uid);
  }, [currentUser]);

  return (
    <DefaultTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors.colors.red[500] }}
    >
      {isLoading ? (
        <DefaultTab.Screen
          key={"loadingscreen"}
          name="Loading"
          component={LoadingScreen}
        />
      ) : (
        appNavigators?.map(
          ({ name, component, iconName, auth }) =>
            isLoggedIn === auth && (
              <DefaultTab.Screen
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
    </DefaultTab.Navigator>
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

// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Tab One Title" }}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: true, headerTitle: "Producto" }}
      />
    </HomeStack.Navigator>
  );
}
