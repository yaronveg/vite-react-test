import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import NewPlace from "./places/pages/NewPlace/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainHeader/MainNavigation/MainNavigation";
import {
  AuthContext,
  AuthContextInterface,
} from "./shared/context/auth-context";
import Auth from "./user/pages/Auth/Auth";
import Users from "./user/pages/Users";

let logoutTimer: number;

const App = () => {
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
  const authProviderValue: AuthContextInterface = {
    isLoggedIn: !!token,
    token,
    userId,
    login,
    logout,
  };

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

  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </>
    );
  }

  return (
    <AuthContext.Provider value={authProviderValue}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
