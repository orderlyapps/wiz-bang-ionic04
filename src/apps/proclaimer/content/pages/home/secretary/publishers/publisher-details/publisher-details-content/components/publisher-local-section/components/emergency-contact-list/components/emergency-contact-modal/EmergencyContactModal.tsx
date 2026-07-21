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
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { PhoneInput } from "@ui/components/inputs/phone/PhoneInput";
import { Select } from "@ui/components/inputs/select/Select";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import type { EmergencyContact, Phone } from "@shared/database/rxdb/collections/publisher";
import { Space } from "@ui/components/layout/space/Space";

type Contact = NonNullable<EmergencyContact>[number];
type PhoneEntry = NonNullable<Phone>[number];

const relationship_options = [
  "Grandfather",
  "Grandmother",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandson",
  "Granddaughter",
  "Husband",
  "Wife",
  "Uncle",
  "Aunt",
  "Cousin",
  "Father-in-law",
  "Mother-in-law",
  "Son-in-law",
  "Daughter-in-law",
  "Friend",
  "Other",
];

interface Props {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_id: string;
  contact?: Contact | null;
}

export function EmergencyContactModal({ is_open, on_dismiss, publisher_id, contact }: Props) {
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [relationship, set_relationship] = useState("");
  const [phones, set_phones] = useState<PhoneEntry[]>([]);

  useEffect(() => {
    if (is_open) {
      set_first_name(contact?.first_name ?? "");
      set_last_name(contact?.last_name ?? "");
      set_relationship(contact?.relationship ?? "");
      set_phones(
        contact?.phone?.length
          ? contact.phone
          : [
              {
                id: crypto.randomUUID(),
                number: "",
                label: "Phone",
                version: {
                  created_by: "",
                  updated_by: "",
                  created_at: Date.now(),
                  updated_at: Date.now(),
                },
              },
            ],
      );
    }
  }, [is_open, contact]);

  function handle_save() {
    const id = contact?.id ?? crypto.randomUUID();
    const version = contact?.version ?? {
      created_by: "",
      updated_by: "",
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    publisherLocalCollection.update(publisher_id, (draft) => {
      if (!draft.emergency_contact) draft.emergency_contact = [];
      const updated = draft.emergency_contact.map((c) =>
        c.id === id
          ? {
              ...c,
              first_name,
              last_name,
              relationship,
              phone: phones,
              version: { ...c.version, updated_at: Date.now() },
            }
          : c,
      );
      if (!draft.emergency_contact.some((c) => c.id === id)) {
        updated.push({ id, first_name, last_name, relationship, phone: phones, version });
      }
      draft.emergency_contact = updated;
    });
    on_dismiss();
  }

  function handle_delete() {
    if (!contact) return;
    publisherLocalCollection.update(publisher_id, (draft) => {
      draft.emergency_contact = (draft.emergency_contact ?? []).filter((c) => c.id !== contact.id);
    });
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{contact ? "Edit" : "Add"} Emergency Contact</IonTitle>
          <IonButtons slot="start">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              strong
              disabled={!first_name.trim() || !last_name.trim() || !relationship.trim()}
              onClick={handle_save}
            >
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <TextInput label="First Name" value={first_name} on_change={set_first_name} />
          <TextInput label="Last Name" value={last_name} on_change={set_last_name} />
          <Select
            label="Relationship"
            value={relationship}
            placeholder="Select relationship"
            options={relationship_options.map((r) => ({ label: r, value: r }))}
            on_change={(value) => set_relationship(value as string)}
          />
          {phones.map((p, i) => (
            <PhoneInput
              key={p.id}
              label={`Phone${phones.length > 1 ? ` ${i + 1}` : ""}`}
              value={p.number}
              on_change={(value) =>
                set_phones(phones.map((ph) => (ph.id === p.id ? { ...ph, number: value } : ph)))
              }
            />
          ))}
        </IonList>
        <Space size="lg" />
        {contact && (
          <DeleteTextButton
            label="Delete Contact"
            alert_header="Delete Emergency Contact"
            alert_message={`Delete ${contact.first_name} ${contact.last_name}?`}
            on_click={handle_delete}
          />
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
