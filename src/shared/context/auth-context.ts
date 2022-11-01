import { createContext } from "react";

export type AuthContextInterface = AuthContextLoggedIn | AuthContextLoggedOut;
interface AuthContextBase {
  login: (uid: string) => void;
  logout: () => void;
}
interface AuthContextLoggedIn extends AuthContextBase {
  isLoggedIn: true;
  userId: string;
}
interface AuthContextLoggedOut extends AuthContextBase {
  isLoggedIn: false;
  userId: null;
}
export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
