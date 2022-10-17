import { createContext } from "react";
import { IdType } from "../../user/interfaces";

export interface AuthContextInterface {
  isLoggedIn: boolean;
  userId: IdType | null;
  login: (uid: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextInterface>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
