import { useEffect, useState } from "react";
import { commerceList } from "../constants/MockData";
import { Commerce } from "../types";

type useCategoriesReturnType = {
  commerces: Commerce[];
  commerceSelected: Commerce | undefined;
};

export default function useCommerces(
  commerceId?: string | number
): useCategoriesReturnType {
  const [commerces] = useState(commerceList);
  const [commerceSelected, setCommerceSelected] =
    useState<Commerce | undefined>();

  function determineCategory(id: string | number): Commerce | undefined {
    const foundCategory = commerces.find((each) => each.id === id);
    if (foundCategory) return foundCategory;
  }

  useEffect(() => {
    if (!commerceId) return;
    const categoryFound = determineCategory(commerceId);
    setCommerceSelected(categoryFound);
  }, []);

  return { commerces, commerceSelected };
}
