import { useState, useEffect } from "react";

export default function useData() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.mocki.io/v1/51ba4fc2")
      .then((r) => {
        if (!r.ok) {
          throw new Error("invalid response");
        }
        return r.json();
      })
      .then((r) => {
        setData(r);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return { data, error, isLoading };
}
