/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Info: undefined;
  Home: undefined;
  Cart: undefined;
  Login: undefined;
  SignUp: undefined;
  User: undefined;
};

export type TabOneParamList = {
  Home: undefined;
  ProductDetail: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  TabTwoTest: undefined;
};

export type Product = {
  id: number;
  title: string;
  description?: string;
  img: string;
  units: number;
  price: number;
  available?: boolean;
  createdDate?: Date;
  collection?: number;
};

export type CartState = {
  cart: Product[];
  cartFunctions: CartActions;
};

export type User = {
  id: number | string;
  username: string;
  email: string;
  address: string;
  password?: never; // Do not store user password
};

export type UserState = {
  currentUser: User;
  userFunctions: UserActions;
};

export type UserActions = {
  login: (user: User) => void;
  logout: () => void;
  signup: (user: User) => void;
};

export type CartActions = {
  addToCart: (product: Product) => void;
  deleteFromCart: (id: number | string) => void;
  clearCart: () => void;
};
