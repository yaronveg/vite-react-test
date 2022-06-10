import { createPortal } from "react-dom";
import "./Backdrop.css";

const Backdrop = (props) => {
  const content = <div className="backdrop" onClick={props.onClick}></div>;
  const portal = document.getElementById("backdrop-hook");

  return createPortal(content, portal);
};
export default Backdrop;
