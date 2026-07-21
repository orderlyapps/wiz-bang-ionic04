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
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
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
    const address_data = {
      label,
      suburb: address_value.suburb.id,
      street: address_value.street?.id ?? "",
      house_number: address_value.house_number ?? "",
      unit_number: address_value.unit_number ?? "",
      coordinates: address_value.coordinates,
    };
    publisherLocalCollection.update(publisher_id, (draft) => {
      if (!draft.address) draft.address = [];
      const updated = draft.address.map((a) =>
        a.id === id
          ? { ...a, ...address_data, version: { ...a.version, updated_at: Date.now() } }
          : a,
      );
      if (!draft.address.some((a) => a.id === id)) {
        updated.push({ id, ...address_data, version });
      }
      draft.address = updated;
    });
    on_dismiss();
  }

  function handle_delete() {
    if (!entry) return;
    publisherLocalCollection.update(publisher_id, (draft) => {
      draft.address = (draft.address ?? []).filter((a) => a.id !== entry.id);
    });
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{entry ? "Edit" : "Add"} Address</IonTitle>
          <IonButtons slot="start">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
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
