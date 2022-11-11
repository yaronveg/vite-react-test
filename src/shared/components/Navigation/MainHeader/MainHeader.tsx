import { ReactNode } from "react";
import "./MainHeader.css";

const MainHeader = (props: { children?: ReactNode }) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
