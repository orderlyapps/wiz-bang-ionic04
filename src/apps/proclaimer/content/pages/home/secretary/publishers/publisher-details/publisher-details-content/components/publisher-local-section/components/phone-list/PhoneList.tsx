import { useState } from "react";
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { addOutline, callOutline, chatbubbleEllipsesOutline } from "ionicons/icons";
import type { Phone } from "@shared/database/rxdb/collections/publisher";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { PhoneAddModal } from "./components/phone-add-modal/PhoneAddModal";

type PhoneEntry = NonNullable<Phone>[number];

interface Props {
  publisher_id: string;
  phone: NonNullable<Phone>;
  read_only?: boolean;
}

export function PhoneList({ publisher_id, phone, read_only = false }: Props) {
  const [editing_entry, set_editing_entry] = useState<PhoneEntry | null>(null);
  const [is_modal_open, set_is_modal_open] = useState(false);

  function open_add() {
    set_editing_entry(null);
    set_is_modal_open(true);
  }

  function open_edit(entry: PhoneEntry) {
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
              <Heading size="sm">Phone Numbers</Heading>
            </IonLabel>
            <IonButton
              fill="clear"
              size="small"
              slot="end"
              onClick={open_add}
              aria-label="Add phone"
            >
              <IonIcon icon={addOutline} color="primary" />
            </IonButton>
          </IonItem>
        </>
      )}
      {phone.map((entry) =>
        read_only ? (
          <LabelValueItem
            key={entry.id}
            label={entry.label + " Phone"}
            value={entry.number}
            end_detail={
              <>
                <IonButton
                  fill="clear"
                  size="small"
                  aria-label={`SMS ${entry.label}`}
                  onClick={() => {
                    window.location.href = `sms:${entry.number}`;
                  }}
                  className="ion-margin-end"
                >
                  <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline} />
                </IonButton>
                <IonButton
                  fill="clear"
                  size="small"
                  aria-label={`Call ${entry.label}`}
                  onClick={() => {
                    window.location.href = `tel:${entry.number}`;
                  }}
                  className="ion-margin-start"
                >
                  <IonIcon slot="icon-only" icon={callOutline} />
                </IonButton>
              </>
            }
          />
        ) : (
          <LabelValueItem
            key={entry.id}
            label={entry.label}
            value={entry.number}
            on_click={() => open_edit(entry)}
          />
        ),
      )}
      {phone.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No phone numbers</IonLabel>
        </IonItem>
      )}
      {!read_only && (
        <PhoneAddModal
          is_open={is_modal_open}
          on_dismiss={close_modal}
          publisher_id={publisher_id}
          entry={editing_entry}
        />
      )}
    </>
  );
}
