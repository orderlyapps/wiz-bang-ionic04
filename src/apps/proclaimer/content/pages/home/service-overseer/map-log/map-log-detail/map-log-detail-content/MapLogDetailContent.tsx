import { MapNavigation } from "./components/map-navigation/MapNavigation";
import { MapLogList } from "./components/map-log-list/MapLogList";

interface MapLogDetailContentProps {
  map_id: string;
}

export function MapLogDetailContent({ map_id }: MapLogDetailContentProps) {
  return (
    <>
      <MapNavigation map_id={map_id} />
      <MapLogList map_id={map_id} />
    </>
  );
}
