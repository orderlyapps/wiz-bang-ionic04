import { IonButton, IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { callOutline, chatbubbleEllipsesOutline } from "ionicons/icons";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

type PersonDetailsSectionProps = {
  address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  notes: string;
};

export function PersonDetailsSection({
  address,
  first_name,
  last_name,
  phone_number,
  notes,
}: PersonDetailsSectionProps) {
  const fullName = [first_name, last_name].filter(Boolean).join(" ");
  const hasAny = address || fullName || phone_number || notes;

  if (!hasAny) return null;

  return (
    <>
      {address && <LabelValueItem label="Address" value={address} />}
      {fullName && <LabelValueItem label="Name" value={fullName} />}
      {phone_number && (
        <LabelValueItem
          label="Phone"
          value={phone_number}
          end_detail={
            <>
              <IonButton
                fill="clear"
                size="small"
                aria-label="SMS"
                onClick={() => {
                  window.location.href = `sms:${phone_number}`;
                }}
                className="ion-margin-end"
              >
                <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline} />
              </IonButton>
              <IonButton
                fill="clear"
                size="small"
                aria-label="Call"
                onClick={() => {
                  window.location.href = `tel:${phone_number}`;
                }}
                className="ion-margin-start"
              >
                <IonIcon slot="icon-only" icon={callOutline} />
              </IonButton>
            </>
          }
        />
      )}
      {notes && (
        <IonItem lines="full">
          <IonLabel>
            <IonText color="medium">
              <p>{notes}</p>
            </IonText>
          </IonLabel>
        </IonItem>
      )}
    </>
  );
}
