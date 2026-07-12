import { useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { Body } from "@ui/components/display/text/body/Body";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { MapRow } from "@shared/database/schemas/map";

interface MapNavigatorProps {
  maps: MapRow[];
  selected_index: number;
  on_change: (index: number) => void;
}

export function MapNavigator({ maps, selected_index, on_change }: MapNavigatorProps) {
  const current_map = maps[selected_index];
  const has_prev = selected_index > 0;
  const has_next = selected_index < maps.length - 1;

  useEffect(() => {
    if (maps.length === 0) return;
    const stored_id = localStorage.getItem(localStorageKeys.bulkEntryMapId);
    if (!stored_id) return;
    const index = maps.findIndex((m) => m.id === stored_id);
    if (index >= 0 && index !== selected_index) {
      on_change(index);
    }
  }, [maps, selected_index, on_change]);

  function handle_change(new_index: number) {
    const map = maps[new_index];
    if (map?.id) {
      localStorage.setItem(localStorageKeys.bulkEntryMapId, map.id);
    }
    on_change(new_index);
  }

  return (
    <InputWrapper label={`Map ${selected_index + 1} of ${maps.length}`}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <IonButton
          fill="clear"
          disabled={!has_prev}
          onClick={() => handle_change(selected_index - 1)}
          aria-label="Previous map"
        >
          <IonIcon icon={chevronBack} slot="icon-only" size="large" />
        </IonButton>
        <Body color={!current_map ? "medium" : undefined} className="ion-margin-horizontal">
          {current_map?.name ?? "No maps available"}
        </Body>
        <IonButton
          fill="clear"
          disabled={!has_next}
          onClick={() => handle_change(selected_index + 1)}
          aria-label="Next map"
        >
          <IonIcon icon={chevronForward} slot="icon-only" size="large" />
        </IonButton>
      </div>
    </InputWrapper>
  );
}
