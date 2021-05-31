import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/Common";

export default function useInitialFetch(URL: string) {
  // This hook allows you to make an initial http when your component mounts
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const FETCH_URL = BASE_URL + URL;

  async function fetchData() {
    // must be a function in order to be able to have access to FETCH_URL (hoisting)
    alert("Called");
    try {
      const req = await fetch(FETCH_URL);
      const res = await req.json();

      setData(res);

      alert(res);
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    let isComponentMounted = true;
    isComponentMounted && fetchData();

    return () => {
      // Disable fetch if the component is unmounted.
      // This will prevent React from updating an unmounted component
      isComponentMounted = false;
    };
  }, [URL]);

  return { isLoading, data };
}
