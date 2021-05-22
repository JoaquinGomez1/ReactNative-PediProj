import { createContext } from "react";
import { State } from "../types";

const cartContext = createContext<State>(undefined!);

export default cartContext;
