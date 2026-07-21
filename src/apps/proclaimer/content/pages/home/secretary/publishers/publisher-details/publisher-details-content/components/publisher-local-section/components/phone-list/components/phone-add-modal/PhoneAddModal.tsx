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
import { PhoneInput } from "@ui/components/inputs/phone/PhoneInput";
import { Select } from "@ui/components/inputs/select/Select";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import type { Phone } from "@shared/database/rxdb/collections/publisher";
import { Space } from "@ui/components/layout/space/Space";

type PhoneEntry = NonNullable<Phone>[number];

const label_options = ["Mobile", "Home", "Work"];

interface Props {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_id: string;
  entry?: PhoneEntry | null;
}

export function PhoneAddModal({ is_open, on_dismiss, publisher_id, entry }: Props) {
  const [label, set_label] = useState("");
  const [number, set_number] = useState("");

  useEffect(() => {
    if (is_open) {
      set_label(entry?.label ?? "");
      set_number(entry?.number ?? "");
    }
  }, [is_open, entry]);

  function handle_save() {
    const id = entry?.id ?? crypto.randomUUID();
    const version = entry?.version ?? {
      created_by: "",
      updated_by: "",
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    publisherLocalCollection.update(publisher_id, (draft) => {
      if (!draft.phone) draft.phone = [];
      const updated = draft.phone.map((p) =>
        p.id === id
          ? { ...p, label, number, version: { ...p.version, updated_at: Date.now() } }
          : p,
      );
      if (!draft.phone.some((p) => p.id === id)) {
        updated.push({ id, label, number, version });
      }
      draft.phone = updated;
    });
    on_dismiss();
  }

  function handle_delete() {
    if (!entry) return;
    publisherLocalCollection.update(publisher_id, (draft) => {
      draft.phone = (draft.phone ?? []).filter((p) => p.id !== entry.id);
    });
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{entry ? "Edit" : "Add"} Phone</IonTitle>
          <IonButtons slot="start">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton strong disabled={!label.trim() || !number.trim()} onClick={handle_save}>
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
          <PhoneInput label="Number" value={number} on_change={set_number} />
        </IonList>

        <Space size="lg" />

        {entry && (
          <DeleteTextButton
            label="Delete Phone"
            alert_header="Delete Phone"
            alert_message={`Delete ${entry.label}?`}
            on_click={handle_delete}
          />
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
