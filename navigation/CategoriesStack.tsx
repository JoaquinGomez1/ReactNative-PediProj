import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import CommerceScreen from "../screens/CommerceListScreen";
import { TabTwoParamList } from "../types";
import CommerceDetailScreen from "../screens/CommerceDetailScreen";

const CategoriesStack = createStackNavigator<TabTwoParamList>();
export function CategoriesNavigator() {
  return (
    <CategoriesStack.Navigator initialRouteName={"CommercesScreen"}>
      <CategoriesStack.Screen
        name="CommercesScreen"
        component={CommerceScreen}
        options={{ headerShown: false }}
      />
      <CategoriesStack.Screen
        name="CommerceDetailScreen"
        component={CommerceDetailScreen}
        options={{ title: "Ver local" }}
      />
    </CategoriesStack.Navigator>
  );
}
