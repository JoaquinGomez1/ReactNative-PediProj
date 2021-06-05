import { useEffect, useState } from "react";
import { Commerce } from "../types";
import useInitialFetch from "./useInitialFetch";

type useCategoriesReturnType = {
  commerces: Commerce[];
  commerceSelected: Commerce | undefined;
};

export default function useCommerces(
  commerceId?: string | number
): useCategoriesReturnType {
  const { data } = useInitialFetch("/commerces");
  const [commerces, setCommerces] = useState(data);
  const [commerceSelected, setCommerceSelected] =
    useState<Commerce | undefined>();

  function determineCommerce(id: string | number): Commerce | undefined {
    const foundCommerce = commerces?.find((each: Commerce) => each.id === id);
    if (foundCommerce) return foundCommerce;
  }

  useEffect(() => {
    if (!commerceId) return;
    const categoryFound = determineCommerce(commerceId);
    setCommerceSelected(categoryFound);
  }, []);

  useEffect(() => {
    setCommerces(data);
  }, [data]);

  return { commerces, commerceSelected };
}
