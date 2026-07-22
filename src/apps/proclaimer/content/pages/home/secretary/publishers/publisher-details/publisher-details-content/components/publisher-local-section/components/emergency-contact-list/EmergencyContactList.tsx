import { useState } from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import type { EmergencyContact } from "@shared/database/rxdb/collections/publisher";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { EmergencyContactModal } from "./components/emergency-contact-modal/EmergencyContactModal";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Space } from "@ui/components/layout/space/Space";

type Contact = NonNullable<EmergencyContact>[number];

interface Props {
  publisher_id: string;
  emergency_contact: NonNullable<EmergencyContact>;
  read_only?: boolean;
}

export function EmergencyContactList({
  publisher_id,
  emergency_contact,
  read_only = false,
}: Props) {
  const [editing_contact, set_editing_contact] = useState<Contact | null>(null);
  const [is_modal_open, set_is_modal_open] = useState(false);

  function open_edit(contact: Contact) {
    set_editing_contact(contact);
    set_is_modal_open(true);
  }

  function open_add() {
    set_editing_contact(null);
    set_is_modal_open(true);
  }

  function close_modal() {
    set_is_modal_open(false);
    set_editing_contact(null);
  }

  return (
    <>
      <>
        <Space />
        <IonItem>
          <IonLabel>
            <Heading size="sm">Emergency Contacts</Heading>
          </IonLabel>
          {!read_only && (
            <IonIcon onClick={open_add} icon={addOutline} slot="end" color="primary" />
          )}
        </IonItem>
        {emergency_contact.map((contact) =>
          (contact.phone ?? []).map((p) => (
            <LabelValueItem
              key={p.id}
              label={`${contact.first_name} ${contact.last_name} (${contact.relationship})`}
              value={p.number}
              on_click={() => !read_only && open_edit(contact)}
            />
          )),
        )}
        {emergency_contact.length === 0 && (
          <IonItem>
            <IonLabel color="medium">No emergency contacts</IonLabel>
          </IonItem>
        )}
      </>
      {!read_only && (
        <EmergencyContactModal
          is_open={is_modal_open}
          on_dismiss={close_modal}
          publisher_id={publisher_id}
          contact={editing_contact}
        />
      )}
    </>
  );
}
