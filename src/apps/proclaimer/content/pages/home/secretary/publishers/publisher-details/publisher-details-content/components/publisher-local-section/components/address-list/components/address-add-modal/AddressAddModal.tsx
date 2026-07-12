import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { AddressInput } from "@ui/components/inputs/address/AddressInput";
import { Select } from "@ui/components/inputs/select/Select";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import type { Address } from "@shared/database/rxdb/collections/publisher";
import type { AddressValue } from "@ui/components/inputs/address/types";
import { Space } from "@ui/components/layout/space/Space";

type AddressEntry = NonNullable<Address>[number];

const label_options = ["Home", "Work", "Other"];

interface Props {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_id: string;
  entry?: AddressEntry | null;
  address_value?: AddressValue;
}

export function AddressAddModal({
  is_open,
  on_dismiss,
  publisher_id,
  entry,
  address_value: initial_value,
}: Props) {
  const [label, set_label] = useState("");
  const [address_value, set_address_value] = useState<AddressValue | undefined>(undefined);

  useEffect(() => {
    if (is_open) {
      set_label(entry?.label ?? "");
      set_address_value(initial_value);
    }
  }, [is_open, entry, initial_value]);

  function handle_save() {
    if (!address_value) return;
    const id = entry?.id ?? crypto.randomUUID();
    const version = entry?.version ?? {
      created_by: "",
      updated_by: "",
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    publisherLocalCollection.update(publisher_id, (draft) => {
      if (!draft.address) draft.address = [];
      const existing = draft.address.find((a) => a.id === id);
      if (existing) {
        Object.assign(existing, {
          label,
          suburb: address_value.suburb.id,
          street: address_value.street?.id ?? "",
          house_number: address_value.house_number ?? "",
          unit_number: address_value.unit_number ?? "",
          coordinates: address_value.coordinates,
          version: { ...existing.version, updated_at: Date.now() },
        });
      } else {
        draft.address.push({
          id,
          label,
          suburb: address_value.suburb.id,
          street: address_value.street?.id ?? "",
          house_number: address_value.house_number ?? "",
          unit_number: address_value.unit_number ?? "",
          coordinates: address_value.coordinates,
          version,
        });
      }
    });
    on_dismiss();
  }

  function handle_delete() {
    if (!entry) return;
    publisherLocalCollection.update(publisher_id, (draft) => {
      if (draft.address) {
        const index = draft.address.findIndex((a) => a.id === entry.id);
        if (index !== -1) {
          draft.address.splice(index, 1);
        }
      }
    });
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{entry ? "Edit" : "Add"} Address</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton strong disabled={!label.trim() || !address_value} onClick={handle_save}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <Select
            label="Type"
            value={label}
            placeholder="Select type"
            options={label_options.map((l) => ({ label: l, value: l }))}
            on_change={(value) => set_label(value as string)}
          />
          <AddressInput label="Address" value={address_value} on_change={set_address_value} />
        </IonList>

        <Space size="lg" />

        {entry && (
          <DeleteTextButton
            label="Delete Address"
            alert_header="Delete Address"
            alert_message={`Delete ${entry.label}?`}
            on_click={handle_delete}
          />
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
