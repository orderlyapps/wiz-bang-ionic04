import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { MapIconButton } from "@ui/components/inputs/button/icon/map/MapIconButton";
import { SettingsIconButton } from "@ui/components/inputs/button/icon/settings/SettingsIconButton";
import { MapModal } from "./components/map-modal/MapModal";
import { SettingsModal } from "./components/settings-modal/SettingsModal";
import { useMapZoom } from "../door-to-door-content/context/mapZoomContext";
import { useSelectedMapName } from "../shared/hooks/useSelectedMapName";

export function DoorToDoorHeader() {
  const [show_map, set_show_map] = useState(false);
  const [show_settings, set_show_settings] = useState(false);
  const { zoomToMap } = useMapZoom();
  const selectedMapName = useSelectedMapName();

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>{selectedMapName ?? "Door To Door"}</IonTitle>
      <IonButtons slot="end">
        <MapIconButton on_click={() => set_show_map(true)} />
        <SettingsIconButton on_click={() => set_show_settings(true)} />
      </IonButtons>
      <MapModal is_open={show_map} on_dismiss={() => set_show_map(false)} onMapSelect={zoomToMap} />
      <SettingsModal is_open={show_settings} on_dismiss={() => set_show_settings(false)} />
    </IonToolbar>
  );
}
