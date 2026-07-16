import { useState } from "react";
import {
  IonAlert,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { removeCircleOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapCheckoutMapCollection } from "@shared/database/collections/map-checkout-map";
import { mapCheckoutPublisherCollection } from "@shared/database/collections/map-checkout-publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapCheckoutMapRow } from "@shared/database/schemas/map-checkout-map";

interface MapCheckoutDetailContentProps {
  checkout_publisher_id?: string;
  max_maps: number;
}

export function MapCheckoutDetailContent({
  checkout_publisher_id,
  max_maps,
}: MapCheckoutDetailContentProps) {
  const [show_maps_modal, set_show_maps_modal] = useState(false);
  const [remove_map, set_remove_map] = useState<MapCheckoutMapRow | null>(null);

  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const { data: checkout_maps_data } = useLiveQuery((q) =>
    q.from({ cm: mapCheckoutMapCollection }),
  );
  const congregation = useStoredCongregation();

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const all_checkout_maps = (checkout_maps_data as MapCheckoutMapRow[] | undefined) ?? [];
  const congregation_maps = all_maps
    .filter((m) => m.congregation_id === congregation?.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const assigned_maps = checkout_publisher_id
    ? all_checkout_maps.filter((cm) => cm.map_checkout_publisher_id === checkout_publisher_id)
    : [];

  const assigned_map_ids = new Set(assigned_maps.map((cm) => cm.map_id));

  function getMapName(map_id: string): string {
    const map = all_maps.find((m) => m.id === map_id);
    return map?.name ?? "Unknown";
  }

  function handleAddMaps(map_ids: string[]) {
    if (!checkout_publisher_id) return;
    for (const map_id of map_ids) {
      mapCheckoutMapCollection.insert({
        id: crypto.randomUUID(),
        map_checkout_publisher_id: checkout_publisher_id,
        map_id,
      });
    }
  }

  function handleRemoveMap(cm: MapCheckoutMapRow) {
    if (!cm.id) return;
    mapCheckoutMapCollection.delete(cm.id);
  }

  return (
    <>
      <IncrementInput
        label="Max Maps"
        value={max_maps}
        min={1}
        on_change={(val) => {
          if (checkout_publisher_id) {
            mapCheckoutPublisherCollection.update(checkout_publisher_id, (draft) => {
              draft.max_maps = val;
            });
          }
        }}
      />

      <IonList>
        {assigned_maps.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>No maps assigned yet.</p>
            </IonLabel>
          </IonItem>
        )}
        {assigned_maps.map((cm) => (
          <IonItemSliding key={cm.id}>
            <IonItem>
              <IonLabel>
                <h3>{getMapName(cm.map_id)}</h3>
              </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="danger" onClick={() => set_remove_map(cm)}>
                <IonIcon slot="icon-only" icon={removeCircleOutline} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>

      <IonItem button onClick={() => set_show_maps_modal(true)}>
        <IonLabel color="primary">
          <h3>Manage Maps</h3>
        </IonLabel>
      </IonItem>

      <ResponsiveModal isOpen={show_maps_modal} onDidDismiss={() => set_show_maps_modal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <CloseIconButton on_click={() => set_show_maps_modal(false)} skip_confirmation />
            </IonButtons>
            <IonTitle>Manage Maps</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {congregation_maps
              .filter((m) => m.id)
              .map((m) => (
                <IonItem key={m.id}>
                  <IonCheckbox
                    checked={assigned_map_ids.has(m.id!)}
                    onIonChange={(e) => {
                      if (e.detail.checked) {
                        handleAddMaps([m.id!]);
                      } else {
                        const cm = assigned_maps.find((cm) => cm.map_id === m.id);
                        if (cm) handleRemoveMap(cm);
                      }
                    }}
                  >
                    {m.name}
                  </IonCheckbox>
                </IonItem>
              ))}
          </IonList>
        </IonContent>
      </ResponsiveModal>

      <IonAlert
        isOpen={remove_map !== null}
        header="Remove Map"
        message={`Remove "${remove_map ? getMapName(remove_map.map_id) : ""}" from this publisher?`}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Remove",
            role: "destructive",
            handler: () => {
              if (remove_map) handleRemoveMap(remove_map);
            },
          },
        ]}
        onDidDismiss={() => set_remove_map(null)}
      />
    </>
  );
}
