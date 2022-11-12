import { useEffect, useRef } from "react";
import { Coordinates } from "../../../../user/interfaces";
import "./Map.css";

const Map = (props: {
  center: Coordinates;
  zoom: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { center, zoom } = props;

  useEffect(() => {
    if (mapRef.current !== null) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });
      new window.google.maps.Marker({ position: center, map });
    }
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
