import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";

type FlyToPublisherControllerProps = {
  coordinates: [number, number] | null;
  on_complete: () => void;
};

export function FlyToPublisherController({
  coordinates,
  on_complete,
}: FlyToPublisherControllerProps) {
  const { current: map } = useMap();
  const prevCoordinates = useRef<[number, number] | null>(null);

  useEffect(() => {
    if (!map || !coordinates) return;
    if (
      prevCoordinates.current &&
      prevCoordinates.current[0] === coordinates[0] &&
      prevCoordinates.current[1] === coordinates[1]
    ) {
      return;
    }
    prevCoordinates.current = coordinates;
    map.flyTo({ center: coordinates, zoom: 17 });
    on_complete();
  }, [map, coordinates, on_complete]);

  return null;
}
