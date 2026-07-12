import { useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonList,
  IonPopover,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";
import { Body } from "@ui/components/display/text/body/Body";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

interface MapNavigationProps {
  map_id: string;
}

export function MapNavigation({ map_id }: MapNavigationProps) {
  const router = useIonRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps
    .filter((m) => m.congregation_id === congregation?.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const current_index = congregation_maps.findIndex((m) => m.id === map_id);
  const current_map = congregation_maps[current_index];

  function getUpdatedPath(newMapId: string) {
    const currentPath = router.routeInfo.pathname;
    return currentPath.replace(/\/[^/]+$/, `/${newMapId}`);
  }

  function navigateToMap(newMapId: string, direction: "back" | "forward" | "none") {
    router.push(getUpdatedPath(newMapId), direction, "replace");
  }

  function handlePrev() {
    if (congregation_maps.length === 0) return;
    const prev_index = current_index <= 0 ? congregation_maps.length - 1 : current_index - 1;
    const prev_map = congregation_maps[prev_index];
    if (prev_map?.id) navigateToMap(prev_map.id, "back");
  }

  function handleNext() {
    if (congregation_maps.length === 0) return;
    const next_index = current_index >= congregation_maps.length - 1 ? 0 : current_index + 1;
    const next_map = congregation_maps[next_index];
    if (next_map?.id) navigateToMap(next_map.id, "forward");
  }

  return (
    <IonItemDivider sticky style={{ zIndex: 1000 }}>
      <IonGrid>
        <IonRow>
          <IonCol size="auto">
            <IonButton fill="clear" onClick={handlePrev}>
              <IonIcon icon={chevronBackOutline} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
          <IonCol
            id="map-nav-popover-trigger"
            className="ion-text-center ion-align-self-center"
            onClick={() => setPopoverOpen(true)}
          >
            <Body color="primary" size="sm" bold>
              {current_map?.name ?? "Map"}
            </Body>
          </IonCol>
          <IonPopover
            id="map-nav"
            trigger="map-nav-popover-trigger"
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
          >
            <IonList>
              {congregation_maps.map((map) => (
                <IonItem
                  key={map.id}
                  onClick={() => {
                    setPopoverOpen(false);
                    if (map.id && map.id !== map_id) {
                      navigateToMap(map.id, "none");
                    }
                  }}
                  lines="none"
                >
                  <Body
                    size={map.id === map_id ? "md" : "sm"}
                    color={map.id === map_id ? "primary" : undefined}
                    bold={map.id === map_id}
                  >
                    {map.name}
                  </Body>
                </IonItem>
              ))}
            </IonList>
          </IonPopover>
          <IonCol size="auto">
            <IonButton fill="clear" onClick={handleNext}>
              <IonIcon icon={chevronForwardOutline} slot="icon-only" size="large" />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItemDivider>
  );
}
