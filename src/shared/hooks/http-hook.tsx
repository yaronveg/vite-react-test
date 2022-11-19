import { useState, useCallback, useRef, useEffect } from "react";
import { getErrorMessage } from "../utils/error";

const abortControllres: AbortController[] = [];

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const activeHttpRequest = useRef(abortControllres);

  const sendRequest = useCallback(
    async (
      url: string,
      method = "GET",
      body: null | string | FormData = null,
      headers = {}
    ) => {
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
        // removing abort controller once the request is complete
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!res.ok) {
          throw new Error(resData.message);
        }
        setIsLoading(false);
        return resData;
      } catch (error) {
        setServerError(getErrorMessage(error));
        setIsLoading(false);
        throw error;
      }
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
