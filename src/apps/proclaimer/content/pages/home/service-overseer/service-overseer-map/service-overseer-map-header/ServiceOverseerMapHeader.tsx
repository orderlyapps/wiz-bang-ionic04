import { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { mapOutline as mapIcon } from "ionicons/icons";
import { MapListModal } from "./map-list-modal/MapListModal";
import type { SelectedMap } from "../utils/types";

type Props = {
  onSelect: (selection: SelectedMap) => void;
  onImportKml: (geojson: GeoJSON.FeatureCollection) => void;
  selected_map: SelectedMap | null;
};

export function ServiceOverseerMapHeader({ onSelect, onImportKml, selected_map }: Props) {
  const [show_maps, set_show_maps] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/service-overseer" />
        </IonButtons>
        <IonTitle>Map</IonTitle>
        <IonButtons slot="end">
          {!selected_map && (
            <IonButton onClick={() => set_show_maps(true)}>
              <IonIcon slot="icon-only" icon={mapIcon} />
            </IonButton>
          )}
          {selected_map && <IonMenuButton />}
        </IonButtons>
      </IonToolbar>
      <MapListModal
        isOpen={show_maps}
        onDidDismiss={() => set_show_maps(false)}
        onSelect={onSelect}
        onImportKml={onImportKml}
      />
    </>
  );
}
