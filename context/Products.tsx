import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import useInitialFetch from "../hooks/useInitialFetch";
import { Product, ProductActions, ProductsState } from "../types";

const ProductContext = createContext<ProductsState>(undefined!);

export function ProductsProvider(props: any) {
  const { data, isLoading } = useInitialFetch("/products");
  const [productsList, setProductsList] = useState<Product[] | any[]>(data);

  useEffect(() => {
    setProductsList(data);
  }, [data]);

  const productsFunctions = useMemo<ProductActions>(
    () => ({
      addProduct: (product) => {
        setProductsList([...productsList, product]);
      },
      deleteProduct: (product) => {
        productsFunctions.deleteProductById(product.id);
      },
      updateProduct: (product) => {
        const productsListCopy = [...productsList];
        const productIndex = productsListCopy.findIndex(
          (each) => each.id === product.id
        );
        productsListCopy[productIndex] = product;
        setProductsList(productsListCopy);
      },
      deleteProductById: (id) => {
        const productsListCopy = [...productsList];
        const productIndex = productsListCopy.findIndex(
          (each) => each.id === id
        );

        productIndex !== undefined && productsListCopy.splice(productIndex, 1);

        setProductsList(productsListCopy);
      },
    }),

    [productsList]
  );

  return (
    <ProductContext.Provider
      {...props}
      value={{ productsFunctions, productsList, isLoading }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductsState {
  const context = useContext<ProductsState>(ProductContext);
  if (!context) throw new Error("Use this hook inside a Cart Provider");

  return context;
}

export default ProductContext;
