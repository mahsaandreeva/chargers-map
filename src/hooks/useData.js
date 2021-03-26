import { useState, useEffect } from "react";

export default function useData() {
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.mocki.io/v1/51ba4fc2")
      .then((r) => r.json())
      .then((r) => {
        if (r.error) {
          setIsError(true);
        } else {
          setData(r);
        }
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  return data;
}
