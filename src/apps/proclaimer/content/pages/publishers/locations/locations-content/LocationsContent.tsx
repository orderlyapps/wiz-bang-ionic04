import { useState } from "react";
import { Redirect } from "react-router-dom";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { MapView } from "@util/vendor/mapbox/MapView";
import { MapMasterLayer } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/map-master-layer/MapMasterLayer";
import { MapShareActionSheet } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/map-share-action-sheet/MapShareActionSheet";
import { PublisherLocationsHeatmap } from "./components/publisher-locations-heatmap/PublisherLocationsHeatmap";
import { PublisherLocationsPoints } from "./components/publisher-locations-points/PublisherLocationsPoints";
import { FlyToPublisherController } from "./components/fly-to-publisher-controller/FlyToPublisherController";

type ShareLocation = {
  lat: number;
  lng: number;
};

type LocationsContentProps = {
  selected_group_id: string;
  fly_to_coordinates: [number, number] | null;
  on_fly_to_complete: () => void;
};

export function LocationsContent({
  selected_group_id,
  fly_to_coordinates,
  on_fly_to_complete,
}: LocationsContentProps) {
  const [shareLocation, setShareLocation] = useState<ShareLocation | null>(null);
  const permissions = usePermissions();
  const can_access =
    permissions.has_elder || permissions.has_congregation_admin || permissions.is_super_admin;

  if (permissions.is_loaded && !can_access) {
    return <Redirect to="/publishers" />;
  }

  return (
    <>
      <MapView
        id="publisher-locations"
        style={{ position: "absolute", inset: 0 }}
        height="100%"
        on_long_press={(lngLat) => setShareLocation({ lat: lngLat.lat, lng: lngLat.lng })}
      >
        <MapMasterLayer />
        <PublisherLocationsHeatmap group_id={selected_group_id} />
        <PublisherLocationsPoints group_id={selected_group_id} />
        <FlyToPublisherController
          coordinates={fly_to_coordinates}
          on_complete={on_fly_to_complete}
        />
      </MapView>
      <MapShareActionSheet
        lat={shareLocation?.lat ?? 0}
        lng={shareLocation?.lng ?? 0}
        is_open={shareLocation !== null}
        on_dismiss={() => setShareLocation(null)}
      />
    </>
  );
}
