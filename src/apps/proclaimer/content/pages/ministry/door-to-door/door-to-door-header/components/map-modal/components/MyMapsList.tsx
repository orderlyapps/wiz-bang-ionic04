import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { useMapsList } from "../hooks/useMapsList";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { MapListItem } from "./map-list-item/MapListItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useAccordionState } from "@util/hooks/use-accordion-state/useAccordionState";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";

interface MyMapsListProps {
  onMapSelect: (map: MapRow & { boundary: number[][] }) => void;
  onPreviewImage: (url: string) => void;
}

export function MyMapsList({ onMapSelect, onPreviewImage }: MyMapsListProps) {
  const session = useAuthSession();
  const auth_user_id = session?.user?.id;
  const allMaps = useMapsList();
  const { data: logs_data } = useLiveQuery((q) => q.from({ l: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const my_publisher = all_publishers.find((p) => p.auth_id === auth_user_id);
  const my_publisher_id = my_publisher?.id;

  const my_checked_out_map_ids = new Set(
    all_logs
      .filter(
        (log) => log.checked_out_at && !log.checked_in_at && log.publisher_id === my_publisher_id,
      )
      .map((log) => log.map_id),
  );

  const myMaps = allMaps.filter((map) => map.id && my_checked_out_map_ids.has(map.id));
  const { value, onIonChange } = useAccordionState(localStorageKeys.myMapsAccordion, "my-maps");

  if (myMaps.length === 0) {
    return null;
  }

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="my-maps">
        <IonItem slot="header">
          <IonLabel>
            <Heading>My Maps</Heading>
          </IonLabel>
        </IonItem>
        <IonList slot="content">
          {myMaps.map((map) => (
            <MapListItem
              key={map.id}
              map={map}
              onMapSelect={onMapSelect}
              onPreviewImage={onPreviewImage}
              label_color="success"
            />
          ))}
        </IonList>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
