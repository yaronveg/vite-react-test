import { ReactChild } from "react";
import "./MainHeader.css";

const MainHeader = (props: { children?: ReactChild }) => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
