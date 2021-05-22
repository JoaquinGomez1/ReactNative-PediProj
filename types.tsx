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

export type State = {
  cart: Product[];
  cartFunctions: CartActions;
};

export type CartActions = {
  addToCart: (product: Product) => void;
  deleteFromCart: (id: number | string) => void;
  clearCart: () => void;
};
