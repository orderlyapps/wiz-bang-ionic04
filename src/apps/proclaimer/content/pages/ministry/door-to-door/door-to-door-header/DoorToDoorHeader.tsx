import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { MapIconButton } from "@ui/components/inputs/button/icon/map/MapIconButton";
import { SettingsIconButton } from "@ui/components/inputs/button/icon/settings/SettingsIconButton";
import { ReturnVisitIconButton } from "@ui/components/inputs/button/icon/return-visit/ReturnVisitIconButton";
import { MapModal } from "./components/map-modal/MapModal";
import { SettingsModal } from "./components/settings-modal/SettingsModal";
import { ReturnVisitListModal } from "./components/return-visit-list-modal/ReturnVisitListModal";
import { useAllReturnVisits } from "./components/return-visit-list-modal/hooks/useAllReturnVisits";
import { useMapZoom } from "../door-to-door-content/context/mapZoomContext";
import { useSelectedMapName } from "../shared/hooks/useSelectedMapName";
import type { ReturnVisit } from "../door-to-door-content/components/layers/return-visit-source/types";

export function DoorToDoorHeader() {
  const [show_map, set_show_map] = useState(false);
  const [show_settings, set_show_settings] = useState(false);
  const [show_return_visits, set_show_return_visits] = useState(false);
  const { zoomToMap, zoomToRef } = useMapZoom();
  const selectedMapName = useSelectedMapName();
  const return_visits = useAllReturnVisits();
  const has_return_visits = return_visits !== null && return_visits.length > 0;

  function handleReturnVisitSelect(rv: ReturnVisit) {
    if (rv.coordinates && Array.isArray(rv.coordinates) && rv.coordinates.length === 2) {
      zoomToRef.current?.([rv.coordinates[0], rv.coordinates[1]]);
    }
  }

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>{selectedMapName ?? "Door To Door"}</IonTitle>
      <IonButtons slot="end">
        {has_return_visits && (
          <ReturnVisitIconButton on_click={() => set_show_return_visits(true)} />
        )}
        <MapIconButton on_click={() => set_show_map(true)} />
        <SettingsIconButton on_click={() => set_show_settings(true)} />
      </IonButtons>
      <MapModal is_open={show_map} on_dismiss={() => set_show_map(false)} onMapSelect={zoomToMap} />
      <SettingsModal is_open={show_settings} on_dismiss={() => set_show_settings(false)} />
      <ReturnVisitListModal
        is_open={show_return_visits}
        on_dismiss={() => set_show_return_visits(false)}
        on_select={handleReturnVisitSelect}
      />
    </IonToolbar>
  );
}
