import { CSSProperties, JSXElementConstructor } from "react";

import "./Card.css";

const Card = (props: {
  className?: string;
  style?: CSSProperties;
  children?: any;
}) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
