import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

const SideDrawer = (props: {
  show: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  children: ReactNode;
}) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  const portal = document.getElementById("drawer-hook");
  return portal && createPortal(content, portal);
};

export default SideDrawer;
