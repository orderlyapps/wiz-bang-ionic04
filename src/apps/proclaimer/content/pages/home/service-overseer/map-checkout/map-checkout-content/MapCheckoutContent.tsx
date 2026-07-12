import { useState } from "react";
import {
  IonAlert,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { mapCheckoutPublisherCollection } from "@shared/database/collections/map-checkout-publisher";
import { mapCheckoutMapCollection } from "@shared/database/collections/map-checkout-map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MapCheckoutPublisherRow } from "@shared/database/schemas/map-checkout-publisher";
import type { MapCheckoutMapRow } from "@shared/database/schemas/map-checkout-map";

type MapCheckoutContentProps = {
  showAddAlert: boolean;
  onAddAlertDismiss: () => void;
};

export function MapCheckoutContent({ showAddAlert, onAddAlertDismiss }: MapCheckoutContentProps) {
  const [delete_publisher, set_delete_publisher] = useState<MapCheckoutPublisherRow | null>(null);

  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const { data: checkout_publishers_data } = useLiveQuery((q) =>
    q.from({ cp: mapCheckoutPublisherCollection }),
  );
  const { data: checkout_maps_data } = useLiveQuery((q) =>
    q.from({ cm: mapCheckoutMapCollection }),
  );
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];
  const all_checkout_publishers =
    (checkout_publishers_data as MapCheckoutPublisherRow[] | undefined) ?? [];
  const all_checkout_maps = (checkout_maps_data as MapCheckoutMapRow[] | undefined) ?? [];

  const congregation_checkout_publishers = all_checkout_publishers.filter(
    (cp) => cp.congregation_id === congregation_id,
  );

  const available_publishers = all_publishers
    .filter((p) => p.congregation_id === congregation_id && !p.archived_at)
    .filter((p) => !congregation_checkout_publishers.some((cp) => cp.publisher_id === p.id))
    .sort((a, b) => getPublisherDisplayName(a).localeCompare(getPublisherDisplayName(b)));

  function getMapCount(checkout_publisher_id: string): number {
    return all_checkout_maps.filter((cm) => cm.map_checkout_publisher_id === checkout_publisher_id)
      .length;
  }

  function getPublisherName(publisher_id: string): string {
    const publisher = all_publishers.find((p) => p.id === publisher_id);
    return publisher ? getPublisherDisplayName(publisher) : "Unknown";
  }

  function handleAddPublisher(publisher_id: string) {
    if (!publisher_id || !congregation_id) return;
    mapCheckoutPublisherCollection.insert({
      id: crypto.randomUUID(),
      publisher_id,
      congregation_id,
      max_maps: 1,
    });
  }

  function handleDeletePublisher(cp: MapCheckoutPublisherRow) {
    if (!cp.id) return;
    const assigned_maps = all_checkout_maps.filter((cm) => cm.map_checkout_publisher_id === cp.id);
    for (const assigned of assigned_maps) {
      if (assigned.id) mapCheckoutMapCollection.delete(assigned.id);
    }
    mapCheckoutPublisherCollection.delete(cp.id);
  }

  return (
    <>
      <IonList>
        {congregation_checkout_publishers.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>No publishers approved yet. Tap + to add one.</p>
            </IonLabel>
          </IonItem>
        )}
        {congregation_checkout_publishers.map((cp) => {
          const count = getMapCount(cp.id ?? "");
          return (
            <IonItemSliding key={cp.id}>
              <IonItem
                button
                detail
                routerLink={`/home/service-overseer/map-checkout/${cp.publisher_id}`}
              >
                <IonLabel>
                  <h3>{getPublisherName(cp.publisher_id)}</h3>
                  <p>
                    Max: {cp.max_maps} map{cp.max_maps !== 1 ? "s" : ""} · {count} assigned
                  </p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => set_delete_publisher(cp)}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        })}
      </IonList>

      <IonAlert
        isOpen={showAddAlert}
        header="Add Publisher"
        message="Select a publisher to approve for map checkout."
        inputs={available_publishers.map((p) => ({
          name: "publisher_id",
          type: "radio" as const,
          label: getPublisherDisplayName(p),
          value: p.id ?? "",
        }))}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Add",
            handler: (publisher_id: string) => {
              if (publisher_id) handleAddPublisher(publisher_id);
            },
          },
        ]}
        onDidDismiss={onAddAlertDismiss}
      />

      <IonAlert
        isOpen={delete_publisher !== null}
        header="Remove Publisher"
        message={`Remove "${delete_publisher ? getPublisherName(delete_publisher.publisher_id) : ""}" from map checkout? This will also remove their assigned maps.`}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Remove",
            role: "destructive",
            handler: () => {
              if (delete_publisher) handleDeletePublisher(delete_publisher);
            },
          },
        ]}
        onDidDismiss={() => set_delete_publisher(null)}
      />
    </>
  );
}
