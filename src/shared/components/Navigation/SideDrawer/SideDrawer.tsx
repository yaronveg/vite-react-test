import { createPortal } from "react-dom";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = <aside className="side-drawer">{props.children}</aside>;
  const portal = document.getElementById("drawer-hook");
  return portal && createPortal(content, portal);
};

export default SideDrawer;
