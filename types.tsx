/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Dispatch } from "react";
import { LatLng } from "react-native-maps";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Comercios: undefined;
  Home: undefined;
  Cart: undefined;
  Login: undefined;
  SignUp: undefined;
  User: undefined;
  Loading: undefined;
};

export type TabOneParamList = {
  Home: undefined;
  ProductDetail: undefined;
};

export type TabTwoParamList = {
  CategoriesScreen: undefined;
  CommercesScreen: undefined;
  CommerceDetailScreen: undefined;
};

export type Product = {
  id: number | string;
  title: string;
  description?: string;
  img: string;
  units: number;
  price: number;
  available?: boolean;
  createdDate?: Date;
  commerce: Commerce["id"];
};

export type Location = {
  longitude: number;
  latitude: number;
  longitudeDelta?: number;
  latitudeDelta?: number;
};

export type Commerce = {
  id: number | string;
  name: string;
  description: string;
  img: string;
  location: LatLng;
  category: Category["id"];
};

export type Category = {
  id: number | string;
  name: string;
  img?: string;
  icon?: string;
};

export type CartState = {
  cart: Product[];
  cartFunctions: CartActions;
};

export interface User {
  id?: number | string;
  username: string;
  email: string;
  address: string;
  password?: never; // Do not store user password
  isLoggedIn?: boolean;
}

export type UserState = {
  currentUser: firebase.default.User | undefined;
  userFunctions: UserActions;
  setCurrentUser: Dispatch<User | firebase.default.User | {}>;
};

export type UserActions = {
  login: (email: string, password: string) => void;
  // loginWithFirebase: () => void;
  logout: () => void;
  signup: (user: User, password: string) => void;
  getCurrentSignedInUser: () => Object | null | undefined;
};

export type CartActions = {
  addToCart: (product: Product) => void;
  deleteFromCart: (id: number | string) => void;
  clearCart: () => void;
};
