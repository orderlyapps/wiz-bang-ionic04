import { IonList } from "@ionic/react";
import { MapStyleSelect } from "@util/vendor/mapbox/MapStyleSelect";
import { useMapStyle } from "@proclaimer-content/pages/ministry/door-to-door/shared/hooks/useMapStyleContext";

export function MapStyleSetting() {
  const { styleId, updateStyleId } = useMapStyle();

  return (
    <IonList>
      <MapStyleSelect value={styleId} on_change={updateStyleId} />
    </IonList>
  );
}
