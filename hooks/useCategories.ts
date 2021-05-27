import { useEffect, useState } from "react";
import { categoriesList } from "../constants/MockData";
import { Category } from "../types";

type useCategoriesReturnType = {
  categories: Category[];
  categorySelected: Category | { name: string };
};

export default function useCategories(
  categoryId?: string | number
): useCategoriesReturnType {
  const [categories] = useState(categoriesList);
  const [categorySelected, setCategorySelected] = useState({
    name: "Default category",
  });

  function determineCategory(id: string | number): Category | { name: string } {
    const foundCategory = categories.find((each) => each.id === id);
    if (foundCategory) return foundCategory;

    return { name: "Not found" };
  }

  useEffect(() => {
    if (!categoryId) return;
    const categoryFound = determineCategory(categoryId);
    setCategorySelected(categoryFound);
  }, []);

  return { categories, categorySelected };
}
