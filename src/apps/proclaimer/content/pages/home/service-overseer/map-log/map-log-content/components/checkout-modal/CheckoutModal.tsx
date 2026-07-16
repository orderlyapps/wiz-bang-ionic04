import { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { PublisherSelectModal } from "@proclaimer-content/pages/home/service-overseer/map-log/bulk-entry/bulk-entry-content/components/bulk-checkout/components/publisher-select-modal/PublisherSelectModal";
import { MapSelectModal } from "./components/map-select-modal/MapSelectModal";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { Space } from "@ui/components/layout/space/Space";

type CheckoutModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  existing_log?: MapLogRow;
  map_id?: string;
};

export function CheckoutModal({ isOpen, onDidDismiss, existing_log, map_id }: CheckoutModalProps) {
  const is_editing = !!existing_log;
  const did_dismiss = useRef(false);
  const initialized = useRef(false);
  const [selected_map_id, set_selected_map_id] = useState<string | undefined>(
    existing_log?.map_id ?? map_id,
  );
  const [selected_map_name, set_selected_map_name] = useState("");
  const [show_map_modal, set_show_map_modal] = useState(false);
  const [selected_publisher_id, set_selected_publisher_id] = useState<string | undefined>(
    existing_log?.publisher_id,
  );
  const [selected_publisher_name, set_selected_publisher_name] = useState("");
  const [show_publisher_modal, set_show_publisher_modal] = useState(false);
  const [checked_out_date, set_checked_out_date] = useState(
    existing_log?.checked_out_at
      ? existing_log.checked_out_at.substring(0, 10)
      : new Date().toLocaleDateString("en-CA"),
  );
  const [checked_in_date, set_checked_in_date] = useState(
    existing_log?.checked_in_at ? existing_log.checked_in_at.substring(0, 10) : "",
  );
  const [notes, set_notes] = useState(existing_log?.notes ?? "");

  const { data: maps_data } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: logs_data } = useLiveQuery((q) => q.from({ ml: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps.filter((m) => m.congregation_id === congregation_id);
  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const checked_out_map_ids = new Set(
    all_logs.filter((log) => !log.checked_in_at && log.map_id).map((log) => log.map_id),
  );
  const available_maps = congregation_maps.filter(
    (m) =>
      m.id && (!checked_out_map_ids.has(m.id) || (is_editing && m.id === existing_log?.map_id)),
  );

  const check_in_before_check_out =
    is_editing && !!checked_in_date && checked_in_date < checked_out_date;

  function handleCheckout() {
    if (!selected_map_id || !selected_publisher_id) return;
    if (is_editing && existing_log?.id) {
      mapLogCollection.update(existing_log.id, (draft) => {
        draft.map_id = selected_map_id;
        draft.publisher_id = selected_publisher_id;
        draft.checked_out_at = checked_out_date;
        draft.checked_in_at = checked_in_date || null;
        draft.notes = notes.trim() || null;
      });
    } else {
      mapLogCollection.insert({
        id: crypto.randomUUID(),
        map_id: selected_map_id,
        publisher_id: selected_publisher_id,
        checked_out_at: checked_out_date,
        checked_in_at: null,
        notes: notes.trim() || null,
      });
    }
    dismiss();
  }

  function handleDelete() {
    if (!existing_log?.id) return;
    mapLogCollection.delete(existing_log.id);
    dismiss();
  }

  function dismiss() {
    if (did_dismiss.current) return;
    did_dismiss.current = true;
    onDidDismiss();
  }

  useEffect(() => {
    if (initialized.current) return;
    const maps = (maps_data as MapRow[] | undefined) ?? [];
    const target_map_id = existing_log?.map_id ?? map_id;
    const map = maps.find((m) => m.id === target_map_id);
    if (map) set_selected_map_name(map.name);
    if (is_editing && existing_log) {
      const publishers = (publishers_data as Publisher[] | undefined) ?? [];
      const publisher = publishers.find((p) => p.id === existing_log.publisher_id);
      if (publisher) set_selected_publisher_name(getPublisherDisplayName(publisher));
      if (map && publisher) initialized.current = true;
    } else if (map) {
      initialized.current = true;
    }
  }, [is_editing, existing_log, map_id, maps_data, publishers_data]);

  function handlePublisherSelect(publisher: Publisher) {
    set_selected_publisher_id(publisher.id);
    set_selected_publisher_name(getPublisherDisplayName(publisher));
  }

  function handleMapSelect(map: MapRow) {
    set_selected_map_id(map.id);
    set_selected_map_name(map.name);
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <CloseIconButton on_click={dismiss} skip_confirmation />
          </IonButtons>
          <IonTitle>{is_editing ? "Edit Log" : "Check Out Map"}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong
              onClick={handleCheckout}
              disabled={!selected_map_id || !selected_publisher_id || !!check_in_before_check_out}
            >
              {is_editing ? "Save" : "Check Out"}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ModalSelect
          label="Map"
          display_value={selected_map_name}
          placeholder="Select a map"
          on_open={() => set_show_map_modal(true)}
        />
        <MapSelectModal
          isOpen={show_map_modal}
          onDismiss={() => set_show_map_modal(false)}
          onSelect={handleMapSelect}
          selectedId={selected_map_id}
          maps={available_maps}
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
          on_change={set_checked_out_date}
        />
        {is_editing && (
          <>
            <DateInput
              label="Check In Date"
              value={checked_in_date}
              on_change={set_checked_in_date}
            />
            {check_in_before_check_out && (
              <IonNote color="danger" className="ion-padding-start">
                Check-in date cannot be before check-out date.
              </IonNote>
            )}
          </>
        )}
        <IonList>
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
        </IonList>
        {is_editing && (
          <>
            <Space />
            <DeleteTextButton
              alert_header="Delete Log"
              alert_message="Are you sure you want to delete this map log?"
              on_click={handleDelete}
            />
          </>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
