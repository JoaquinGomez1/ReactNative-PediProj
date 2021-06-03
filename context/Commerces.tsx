import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import useInitialFetch from "../hooks/useInitialFetch";
import { Commerce, CommercesActions, CommercesState } from "../types";

const CommerceContext = createContext<CommercesState>(undefined!);

export function CommercesProvider(props: any) {
  const { data, isLoading } = useInitialFetch("/commerces");
  const [commerceList, setCommercesList] = useState<Commerce[] | any[]>(data);

  useEffect(() => {
    setCommercesList(data);
  }, [data]);

  const commerceFunctions = useMemo<CommercesActions>(
    () => ({
      addCommerce: (commerce) => {
        setCommercesList([...commerceList, commerce]);
      },
      deleteCommerce: (product) => {
        commerceFunctions.deleteCommerceById(product.id);
      },
      updateCommerce: (commerce) => {
        const commerceListCopy = [...commerceList];
        const commerceIndex = commerceListCopy.findIndex(
          (each) => each.id === commerce.id
        );
        commerceListCopy[commerceIndex] = commerce;
        setCommercesList(commerceListCopy);
      },
      deleteCommerceById: (id) => {
        const commerceListCopy = [...commerceList];
        const commerceIndex = commerceListCopy.findIndex(
          (each) => each.id === id
        );

        commerceIndex !== undefined &&
          commerceListCopy.splice(commerceIndex, 1);

        setCommercesList(commerceListCopy);
      },
    }),

    [commerceList]
  );

  return (
    <CommerceContext.Provider
      {...props}
      value={{ commerceFunctions, commerceList, isLoading }}
    >
      {props.children}
    </CommerceContext.Provider>
  );
}

export function useCommercesProvider(): CommercesState {
  const context = useContext<CommercesState>(CommerceContext);
  if (!context) throw new Error("Use this hook inside a Cart Provider");

  return context;
}

export default CommerceContext;
