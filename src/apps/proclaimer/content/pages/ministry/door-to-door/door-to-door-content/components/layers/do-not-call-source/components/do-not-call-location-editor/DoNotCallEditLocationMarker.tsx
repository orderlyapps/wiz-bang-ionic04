import { Marker } from "react-map-gl/mapbox";
import type { MarkerDragEvent } from "react-map-gl/mapbox";

const MARKER_SIZE = 50;
const INNER_SIZE = MARKER_SIZE / 2.5;

const markerStyle: React.CSSProperties = {
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  position: "relative",
  borderRadius: "50% 50% 50% 0",
  background: "var(--ion-color-primary)",
  border: "3px solid white",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
  transform: "rotate(-45deg)",
  cursor: "grab",
};

const markerInnerStyle: React.CSSProperties = {
  width: INNER_SIZE,
  height: INNER_SIZE,
  borderRadius: "50%",
  background: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

type DoNotCallEditLocationMarkerProps = {
  coordinates: [number, number];
  onChange: (coordinates: [number, number]) => void;
};

export function DoNotCallEditLocationMarker({
  coordinates,
  onChange,
}: DoNotCallEditLocationMarkerProps) {
  return (
    <Marker
      longitude={coordinates[0]}
      latitude={coordinates[1]}
      anchor="bottom"
      draggable
      onDragEnd={(event: MarkerDragEvent) => {
        onChange([event.lngLat.lng, event.lngLat.lat]);
      }}
    >
      <div style={markerStyle}>
        <div style={markerInnerStyle} />
      </div>
    </Marker>
  );
}
