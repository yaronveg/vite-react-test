import { createContext } from "react";

export interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: string | null;
  login: (uid: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
