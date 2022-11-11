import { CSSProperties, ReactChild } from "react";

import "./Card.css";

const Card = (props: {
  className?: string;
  style?: CSSProperties;
  children?: ReactChild;
}) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
