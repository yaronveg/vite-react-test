import { useCallback, useEffect, useState } from "react";
import { AuthContextInterface } from "../context/auth-context";
let logoutTimer: number;

export const useAuth = () => {
  const [token, setToken] = useState<null | string>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<null | Date>(
    null
  );
  const [userId, setUserId] = useState<null | string>(null);

  const login = useCallback(
    (uid: string, token: string, expirationDate: Date) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDateNew =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // depends on the server side epiration to also be 1 hour.
      setTokenExpirationDate(tokenExpirationDateNew);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token,
          expiration: tokenExpirationDateNew.toISOString(),
        })
      );
    },
    []
  );
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);
  const authProviderValue: AuthContextInterface =
    !!token && !!userId
      ? {
          isLoggedIn: true,
          token,
          userId,
          login,
          logout,
        }
      : { isLoggedIn: false, token: null, userId: null, login, logout };

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (
        userData &&
        userData.token &&
        new Date(userData.expiration) > new Date()
      )
        login(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [login]);

  return { authProviderValue };
};
