import { useLiveQuery } from "@tanstack/react-db";
import { IonChip, IonLabel } from "@ionic/react";
import { mapTagCollection } from "@shared/database/collections/map-tag";
import { mapTagAssignmentCollection } from "@shared/database/collections/map-tag-assignment";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import type { MapTagRow } from "@shared/database/schemas/map-tag";
import type { MapTagAssignmentRow } from "@shared/database/schemas/map-tag-assignment";

type Props = {
  map_id: string;
};

export function MapTagSelect({ map_id }: Props) {
  const { data: tags_data } = useLiveQuery((q) =>
    q.from({ t: mapTagCollection }).orderBy(({ t }) => t.name),
  );
  const { data: assignments_data } = useLiveQuery((q) => q.from({ a: mapTagAssignmentCollection }));
  const congregation = useStoredCongregation();

  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const all_assignments = (assignments_data as MapTagAssignmentRow[] | undefined) ?? [];
  const congregation_tags = all_tags.filter((t) => t.congregation_id === congregation?.id);
  const map_assignments = all_assignments.filter((a) => a.map_id === map_id);
  const selected_tag_ids = map_assignments.map((a) => a.tag_id);

  const options = congregation_tags.map((t) => ({
    label: t.name,
    value: t.id ?? "",
  }));

  function handle_change(next_ids: string[]) {
    const current_set = new Set(selected_tag_ids);
    const next_set = new Set(next_ids);

    for (const tag_id of next_set) {
      if (!current_set.has(tag_id)) {
        mapTagAssignmentCollection.insert({
          id: crypto.randomUUID(),
          map_id,
          tag_id,
        });
      }
    }

    for (const assignment of map_assignments) {
      if (!next_set.has(assignment.tag_id) && assignment.id) {
        mapTagAssignmentCollection.delete(assignment.id);
      }
    }
  }

  return (
    <AlertMultiSelect
      label="Tags"
      options={options}
      selected={selected_tag_ids}
      placeholder="Add tags..."
      on_change={handle_change}
      render_selected={(selected_ids, opts) =>
        selected_ids.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {selected_ids.map((id) => {
              const tag = opts.find((o) => o.value === id);
              return (
                <IonChip key={id} style={{ margin: 0 }}>
                  <IonLabel>{tag?.label}</IonLabel>
                </IonChip>
              );
            })}
          </div>
        ) : null
      }
    />
  );
}
