import React from "react";
import "./Avatar.css";

const Avatar = (props: {
  className?: string;
  style?: React.CSSProperties;
  image: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width ?? 50, height: props.width ?? 50 }}
      />
    </div>
  );
};

export default Avatar;
