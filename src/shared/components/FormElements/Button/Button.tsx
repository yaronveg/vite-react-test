import { ReactChild } from "react";
import { Link, To } from "react-router-dom";

import "./Button.css";

const Button = (props: {
  href?: string;
  inverse?: boolean;
  danger?: boolean;
  disabled?: boolean;
  size?: "small" | "big";
  to?: To;
  children?: ReactChild;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
