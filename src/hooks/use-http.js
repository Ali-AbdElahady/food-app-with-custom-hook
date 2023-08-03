import { useCallback } from "react";
import { useState } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Some thing went wrong");
      }

      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message || "Some thing went wrong");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;