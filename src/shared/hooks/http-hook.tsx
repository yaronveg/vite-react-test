import { useState, useCallback, useRef, useEffect } from "react";

const abortControllres: AbortController[] = [];

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState();

  const activeHttpRequest = useRef(abortControllres);

  const sendRequest = useCallback(
    async (url: string, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);
      try {
        const res = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message);
        }
        return resData;
      } catch (error) {
        setServerError(error);
      }
      setIsLoading(false);
    },
    []
  );
  const clearError = () => {
    setServerError(undefined);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, serverError, sendRequest, clearError };
};
