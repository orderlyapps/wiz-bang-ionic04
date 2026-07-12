import { useState } from "react";
import { IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonCheckbox } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapTagAssignmentCollection } from "@shared/database/collections/map-tag-assignment";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapTagAssignmentRow } from "@shared/database/schemas/map-tag-assignment";

type FilterMode = "all" | "tagged" | "untagged";

interface MapTagDetailContentProps {
  tag_id: string;
}

export function MapTagDetailContent({ tag_id }: MapTagDetailContentProps) {
  const [filter, set_filter] = useState<FilterMode>("all");

  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const { data: assignments_data } = useLiveQuery((q) => q.from({ a: mapTagAssignmentCollection }));
  const congregation = useStoredCongregation();

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const all_assignments = (assignments_data as MapTagAssignmentRow[] | undefined) ?? [];
  const congregation_maps = all_maps
    .filter((m) => m.congregation_id === congregation?.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  const tagged_map_ids = new Set(
    all_assignments.filter((a) => a.tag_id === tag_id).map((a) => a.map_id),
  );

  const filtered_maps = congregation_maps.filter((map) => {
    const is_tagged = map.id != null && tagged_map_ids.has(map.id);
    if (filter === "tagged") return is_tagged;
    if (filter === "untagged") return !is_tagged;
    return true;
  });

  function handleToggleAssignment(map_id: string, checked: boolean) {
    if (checked) {
      mapTagAssignmentCollection.insert({
        id: crypto.randomUUID(),
        map_id,
        tag_id,
      });
    } else {
      const assignment = all_assignments.find((a) => a.map_id === map_id && a.tag_id === tag_id);
      if (assignment?.id) {
        mapTagAssignmentCollection.delete(assignment.id);
      }
    }
  }

  return (
    <>
      <IonList>
        <IonItem>
          <IonSelect
            label="Filter"
            value={filter}
            onIonChange={(e) => set_filter(e.detail.value as FilterMode)}
            interface="popover"
          >
            <IonSelectOption value="all">All maps</IonSelectOption>
            <IonSelectOption value="tagged">Tagged</IonSelectOption>
            <IonSelectOption value="untagged">Untagged</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>

      <IonList>
        {filtered_maps.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>No maps found.</p>
            </IonLabel>
          </IonItem>
        )}
        {filtered_maps.map((map) => {
          const is_tagged = map.id != null && tagged_map_ids.has(map.id);
          return (
            <IonItem key={map.id}>
              <IonCheckbox
                checked={is_tagged}
                onIonChange={(e) => map.id && handleToggleAssignment(map.id, e.detail.checked)}
              >
                <IonLabel>
                  <h3>{map.name}</h3>
                  {map.details && <p>{map.details}</p>}
                </IonLabel>
              </IonCheckbox>
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
}
