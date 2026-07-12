import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { useMapsList } from "../hooks/useMapsList";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import { MapListItem } from "./map-list-item/MapListItem";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useAccordionState } from "@util/hooks/use-accordion-state/useAccordionState";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";

interface RecentMapsListProps {
  recentMapIds: string[];
  onMapSelect: (map: MapRow & { boundary: number[][] }) => void;
  onPreviewImage: (url: string) => void;
}

export function RecentMapsList({ recentMapIds, onMapSelect, onPreviewImage }: RecentMapsListProps) {
  const allMaps = useMapsList();
  const { data: logs_data } = useLiveQuery((q) => q.from({ l: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const publisher_name_by_id = new Map(
    all_publishers.map((p) => [p.id ?? "", getPublisherDisplayName(p)]),
  );

  const checked_out_map_ids = new Set(
    all_logs.filter((log) => log.checked_out_at && !log.checked_in_at).map((log) => log.map_id),
  );

  const checked_out_name_by_map_id = new Map(
    all_logs
      .filter((log) => log.checked_out_at && !log.checked_in_at)
      .map((log) => [log.map_id, publisher_name_by_id.get(log.publisher_id) ?? ""]),
  );

  // Filter maps to only include recent ones, maintaining the order from recentMapIds
  const recentMaps = recentMapIds
    .map((id) => allMaps.find((map) => map.id === id))
    .filter(Boolean) as (MapRow & { boundary: number[][] })[];
  const { value, onIonChange } = useAccordionState(
    localStorageKeys.recentMapsAccordion,
    "recent-maps",
  );

  if (recentMaps.length === 0) {
    return null;
  }

  return (
    <IonAccordionGroup value={value} onIonChange={onIonChange}>
      <IonAccordion value="recent-maps">
        <IonItem slot="header">
          <IonLabel>
            <Heading>Recent Maps</Heading>
          </IonLabel>
        </IonItem>
        <IonList slot="content">
          {recentMaps.map((map) => {
            const is_checked_out = checked_out_map_ids.has(map.id ?? "");
            const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
            return (
              <MapListItem
                key={map.id}
                map={map}
                onMapSelect={onMapSelect}
                onPreviewImage={onPreviewImage}
                label_color={is_checked_out ? "success" : undefined}
                value_2={checked_out_name || undefined}
              />
            );
          })}
        </IonList>
      </IonAccordion>
    </IonAccordionGroup>
  );
}
