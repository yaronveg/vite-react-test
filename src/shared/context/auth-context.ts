import { createContext } from "react";

export interface AuthContextInterface {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
