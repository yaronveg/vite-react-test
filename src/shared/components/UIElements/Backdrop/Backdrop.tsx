import { createPortal } from "react-dom";
import "./Backdrop.css";

const Backdrop = (props: {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const content = <div className="backdrop" onClick={props.onClick}></div>;
  const portal = document.getElementById("backdrop-hook");

  return createPortal(content, portal as Element);
};
export default Backdrop;
