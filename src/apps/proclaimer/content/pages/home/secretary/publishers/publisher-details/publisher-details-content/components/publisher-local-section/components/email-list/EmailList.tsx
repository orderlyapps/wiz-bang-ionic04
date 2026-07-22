import { useState } from "react";
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addOutline, mailOutline } from "ionicons/icons";
import type { Email } from "@shared/database/rxdb/collections/publisher";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { EmailAddModal } from "./components/email-add-modal/EmailAddModal";

type EmailEntry = NonNullable<Email>[number];

interface Props {
  publisher_id: string;
  email: NonNullable<Email>;
  read_only?: boolean;
}

export function EmailList({ publisher_id, email, read_only = false }: Props) {
  const [editing_entry, set_editing_entry] = useState<EmailEntry | null>(null);
  const [is_modal_open, set_is_modal_open] = useState(false);

  function open_add() {
    set_editing_entry(null);
    set_is_modal_open(true);
  }

  function open_edit(entry: EmailEntry) {
    set_editing_entry(entry);
    set_is_modal_open(true);
  }

  function close_modal() {
    set_is_modal_open(false);
    set_editing_entry(null);
  }

  return (
    <>
      {!read_only && (
        <>
          <Space />
          <IonItem>
            <IonLabel>
              <Heading size="sm">Email Addresses</Heading>
            </IonLabel>
            <IonButton
              fill="clear"
              size="small"
              slot="end"
              onClick={open_add}
              aria-label="Add email"
            >
              <IonIcon icon={addOutline} color="primary" />
            </IonButton>
          </IonItem>
        </>
      )}
      {email.map((entry) =>
        read_only ? (
          <LabelValueItem
            key={entry.id}
            label={entry.label + " Email"}
            value={entry.address}
            end_detail={
              <IonButton
                fill="clear"
                size="small"
                aria-label={`Email ${entry.label}`}
                onClick={() => {
                  window.location.href = `mailto:${entry.address}`;
                }}
              >
                <IonIcon slot="icon-only" icon={mailOutline} />
              </IonButton>
            }
          />
        ) : (
          <LabelValueItem
            key={entry.id}
            label={entry.label}
            value={entry.address}
            on_click={() => open_edit(entry)}
          />
        ),
      )}
      {email.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No email addresses</IonLabel>
        </IonItem>
      )}
      {!read_only && (
        <EmailAddModal
          is_open={is_modal_open}
          on_dismiss={close_modal}
          publisher_id={publisher_id}
          entry={editing_entry}
        />
      )}
    </>
  );
}
