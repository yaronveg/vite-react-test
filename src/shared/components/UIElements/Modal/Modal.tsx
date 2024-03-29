import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const ModalOverlay = (props: {
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  header?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  contentClass?: string;
  children?: ReactNode;
  footerClass?: string;
  footer?: ReactNode;
}) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  const portal = document.getElementById("modal-hook");

  return portal && createPortal(content, portal);
};

const Modal = (props: {
  show?: boolean;
  onCancel?: React.MouseEventHandler<HTMLDivElement>;
  header?: string;
  footer?: ReactNode;
  children?: ReactNode;
  contentClass?: string;
  footerClass?: string;
}) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
