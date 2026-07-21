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
import { EmailInput } from "@ui/components/inputs/email/EmailInput";
import { Select } from "@ui/components/inputs/select/Select";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import type { Email } from "@shared/database/rxdb/collections/publisher";
import { Space } from "@ui/components/layout/space/Space";

type EmailEntry = NonNullable<Email>[number];

const label_options = ["Personal", "JWPub", "Work", "Other"];

interface Props {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_id: string;
  entry?: EmailEntry | null;
}

export function EmailAddModal({ is_open, on_dismiss, publisher_id, entry }: Props) {
  const [label, set_label] = useState("");
  const [address, set_address] = useState("");

  useEffect(() => {
    if (is_open) {
      set_label(entry?.label ?? "");
      set_address(entry?.address ?? "");
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
      if (!draft.email) draft.email = [];
      const updated = draft.email.map((e) =>
        e.id === id
          ? { ...e, label, address, version: { ...e.version, updated_at: Date.now() } }
          : e,
      );
      if (!draft.email.some((e) => e.id === id)) {
        updated.push({ id, label, address, version });
      }
      draft.email = updated;
    });
    on_dismiss();
  }

  function handle_delete() {
    if (!entry) return;
    publisherLocalCollection.update(publisher_id, (draft) => {
      draft.email = (draft.email ?? []).filter((e) => e.id !== entry.id);
    });
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{entry ? "Edit" : "Add"} Email</IonTitle>
          <IonButtons slot="start">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton strong disabled={!label.trim() || !address.trim()} onClick={handle_save}>
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
          <EmailInput label="Email" value={address} on_change={set_address} />
        </IonList>

        <Space size="lg" />

        {entry && (
          <DeleteTextButton
            label="Delete Email"
            alert_header="Delete Email"
            alert_message={`Delete ${entry.label}?`}
            on_click={handle_delete}
          />
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
