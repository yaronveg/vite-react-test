import { useEffect, useRef } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef(null);
  const { center, zoom } = props;

  useEffect(() => {
    console.log("map ref: ", mapRef);

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    new window.google.maps.Marker({ position: center, map });
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
