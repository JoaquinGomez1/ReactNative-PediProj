import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/Common";

export default function useInitialFetch(URL: string) {
  // Initial http when your component mounts or when the URL changes
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const FETCH_URL = BASE_URL + URL;

  async function fetchData() {
    try {
      const req = await fetch(FETCH_URL);
      const res = await req.json();

      setData(res);

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

  return { isLoading, data, setIsLoading };
}
