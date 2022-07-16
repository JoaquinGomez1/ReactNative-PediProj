import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import UserScreen from "../screens/UserScreen";
import AdminPanelScreen from "../screens/AdminPanelScreen";
import ManageProductsScreen from "../screens/ManageProductScreen";
import ManageCommercesScreen from "../screens/ManageCommerceScreen";
import AddProductScreen from "../screens/ManageProductScreen/AddProductScreen";
import AddCommerceScreen from "../screens/ManageCommerceScreen/AddCommerceScreen";
import EditProductScreen from "../screens/ManageProductScreen/EditProductScreen";
import OrdersListScreen from "../screens/OrdersListScreen";

const UserStack = createStackNavigator();
export function UserNavigator() {
  return (
    <UserStack.Navigator initialRouteName="User">
      <UserStack.Screen
        name="User"
        options={{ headerShown: true }}
        component={UserScreen}
      />

      <UserStack.Screen
        name="AdminPanel"
        options={{ headerShown: true, title: "Admin Panel" }}
        component={AdminPanelScreen}
      />

      <UserStack.Screen
        name="OrdersList"
        options={{ headerShown: true, title: "Ver Ordenes" }}
        component={OrdersListScreen}
      />

      <UserStack.Screen
        name="ManageProducts"
        options={{ headerShown: true, title: "Gestionar Productos" }}
        component={ManageProductsScreen}
      />

      <UserStack.Screen
        name="AddProduct"
        options={{ headerShown: true, title: "Agregar Producto" }}
        component={AddProductScreen}
      />
      <UserStack.Screen
        name="EditProduct"
        options={{ headerShown: true, title: "Editar Producto" }}
        component={EditProductScreen}
      />

      <UserStack.Screen
        name="AddCommerce"
        options={{ headerShown: true, title: "Agregar Comercio" }}
        component={AddCommerceScreen}
      />

      <UserStack.Screen
        name="ManageCommerces"
        options={{ headerShown: true, title: "Gestionar comercios" }}
        component={ManageCommercesScreen}
      />
    </UserStack.Navigator>
  );
}
