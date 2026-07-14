import { useState } from "react";
import { IonButton, IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { callOutline, chatbubbleEllipsesOutline, mapOutline } from "ionicons/icons";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { MapShareActionSheet } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/map-share-action-sheet/MapShareActionSheet";

type PersonDetailsSectionProps = {
  address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  notes: string;
  lat?: number;
  lng?: number;
};

export function PersonDetailsSection({
  address,
  first_name,
  last_name,
  phone_number,
  notes,
  lat,
  lng,
}: PersonDetailsSectionProps) {
  const [share_coords, set_share_coords] = useState<{ lat: number; lng: number } | null>(null);
  const fullName = [first_name, last_name].filter(Boolean).join(" ");
  const hasAny = address || fullName || phone_number || notes;
  const has_coords = lat != null && lng != null;

  if (!hasAny) return null;

  return (
    <>
      <LabelValueItem
        label="Address"
        value={address}
        end_detail={
          has_coords ? (
            <IonButton
              fill="clear"
              size="small"
              aria-label="Share location"
              onClick={() => set_share_coords({ lat: lat!, lng: lng! })}
            >
              <IonIcon slot="icon-only" icon={mapOutline} />
            </IonButton>
          ) : undefined
        }
      />

      <MapShareActionSheet
        lat={share_coords?.lat ?? 0}
        lng={share_coords?.lng ?? 0}
        is_open={share_coords !== null}
        on_dismiss={() => set_share_coords(null)}
      />

      <LabelValueItem label="Name" value={fullName} />

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

      {notes && (
        <IonItem lines="full">
          <IonLabel>
            <IonText color="medium">
              <p style={{ whiteSpace: "pre-wrap" }}>{notes}</p>
            </IonText>
          </IonLabel>
        </IonItem>
      )}
    </>
  );
}
