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
  units: number | undefined;
  maxUnits?: number;
  price: number | undefined;
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
  longitude: number | undefined;
  latitude: number | undefined;
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
  login: (
    email: string,
    password: string
  ) => Promise<firebase.default.User | null>;
  // loginWithFirebase: () => void;
  logout: () => void;
  signup: (user: User, password: string) => void;
  getCurrentSignedInUser: () => Object | null | undefined;
};

export type CartActions = {
  addToCart: (product: Product) => void;
  deleteFromCart: (id: number | string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  setProductQuantity: (ammount: number, id: string | number) => void;
};

export type ProductActions = {
  addProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
  deleteProductById: (id: number | string) => void;
  updateProduct: (product: Product) => void;
};

export type ProductsState = {
  productsList: Product[];
  productsFunctions: ProductActions;
  isLoading: boolean;
};

export type CommercesState = {
  commerceList: Commerce[];
  commercesFunctions: CommercesActions;
  isLoading: boolean;
};

export type CommercesActions = {
  addCommerce: (commerce: Product) => void;
  deleteCommerce: (commerce: Product) => void;
  deleteCommerceById: (commerceId: number | string) => void;
  updateCommerce: (commerce: Product) => void;
};

export type Customer_Order = {
  products: Array<Product>;
  orderData: Order;
};

export type Order = {
  id?: number;
  customerName: string;
  email: string;
  address: string;
  total: number;
};
