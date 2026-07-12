import { useState } from "react";
import { IonItem, IonList, IonTextarea } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { PublisherSelectModal } from "./components/publisher-select-modal/PublisherSelectModal";
import { MapNavigator } from "./components/map-navigator/MapNavigator";
import type { MapRow } from "@shared/database/schemas/map";
import type { Publisher } from "@shared/database/schemas/publisher";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { MapLogSummary } from "./components/map-log-summary/MapLogSummary";

export function BulkCheckout() {
  const [selected_publisher_id, set_selected_publisher_id] = useState<string | undefined>(
    undefined,
  );
  const [selected_publisher_name, set_selected_publisher_name] = useState("");
  const [show_publisher_modal, set_show_publisher_modal] = useState(false);
  const [selected_map_index, set_selected_map_index] = useState(0);
  const [checked_out_date, set_checked_out_date] = useState("");
  const [checked_in_date, set_checked_in_date] = useState("");
  const [notes, set_notes] = useState("");

  const { data: maps_data } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps.filter((m) => m.congregation_id === congregation_id);
  const selected_map = congregation_maps[selected_map_index];

  function handleBulkCheckout() {
    if (!selected_publisher_id || !selected_map?.id || !checked_out_date) return;
    const checked_out_at = checked_out_date;
    const checked_in_at = checked_in_date || null;
    mapLogCollection.insert({
      id: crypto.randomUUID(),
      map_id: selected_map.id,
      publisher_id: selected_publisher_id,
      checked_out_at,
      checked_in_at,
      notes: notes.trim() || null,
    });
    set_checked_out_date("");
    set_checked_in_date("");
    set_notes("");
  }

  function handlePublisherSelect(publisher: Publisher) {
    set_selected_publisher_id(publisher.id);
    set_selected_publisher_name(getPublisherDisplayName(publisher));
  }

  return (
    <IonList>
      <MapNavigator
        maps={congregation_maps}
        selected_index={selected_map_index}
        on_change={set_selected_map_index}
      />

      <ModalSelect
        label="Publisher"
        display_value={selected_publisher_name}
        placeholder="Select a publisher"
        on_open={() => set_show_publisher_modal(true)}
      />

      <PublisherSelectModal
        isOpen={show_publisher_modal}
        onDismiss={() => set_show_publisher_modal(false)}
        onSelect={handlePublisherSelect}
        selectedId={selected_publisher_id}
      />

      <DateInput
        label="Check Out Date"
        value={checked_out_date}
        on_change={(value) => {
          set_checked_out_date(value);
          if (value && !checked_in_date) {
            const d = new Date(value + "T00:00:00");
            d.setMonth(d.getMonth() + 1);
            set_checked_in_date(d.toISOString().substring(0, 10));
          }
        }}
      />

      <DateInput
        label="Check In Date"
        value={checked_in_date}
        on_change={(value) => {
          set_checked_in_date(value);
          if (value && !checked_out_date) {
            const d = new Date(value + "T00:00:00");
            d.setMonth(d.getMonth() - 1);
            set_checked_out_date(d.toISOString().substring(0, 10));
          }
        }}
      />

      <IonItem>
        <IonTextarea
          label="Notes"
          labelPlacement="stacked"
          value={notes}
          onIonInput={(e) => set_notes((e.target as HTMLIonTextareaElement).value as string)}
          placeholder="Optional notes"
          autoGrow
        />
      </IonItem>

      <Space />

      <TextButton
        label="Add Log"
        disabled={!selected_publisher_id || congregation_maps.length === 0 || !checked_out_date}
        on_click={handleBulkCheckout}
      />

      {selected_map?.id && <MapLogSummary map_id={selected_map.id} />}
    </IonList>
  );
}
