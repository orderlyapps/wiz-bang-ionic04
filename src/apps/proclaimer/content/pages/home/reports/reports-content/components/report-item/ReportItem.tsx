import { IonItem, IonLabel, IonIcon, IonGrid, IonCol, IonRow } from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import { Body } from "@ui/components/display/text/body/Body";
import { Label } from "@ui/components/display/text/label/Label";

interface ReportItemProps {
  label: string;
  active: boolean | null;
  aux_pio: boolean | null;
  hours: number | null;
  bible_studies: number | null;
  credit_hours: Partial<Record<"ldc" | "bethel" | "hlc" | "school", number>> | null;
  comments: string | null;
  onClick?: () => void;
  button?: boolean;
  detail?: boolean;
  disabled?: boolean;
}

export function ReportItem({
  label,
  active,
  aux_pio,
  hours,
  bible_studies,
  credit_hours,
  comments,
  onClick,
  button,
  detail,
  disabled,
}: ReportItemProps) {
  return (
    <IonItem lines="full" button={button} detail={detail} disabled={disabled} onClick={onClick}>
      <IonLabel>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol>
              <Label>{label}</Label>
            </IonCol>
            <IonCol>
              {hours && <Body>{`${hours ?? "—"} hr`}</Body>}
              {bible_studies && (
                <Body className="ion-padding-start">{` ${bible_studies ?? "—"} st`}</Body>
              )}
            </IonCol>
          </IonRow>
          {aux_pio && (
            <IonRow>
              <IonCol className="ion-padding-start">
                <Body size="xs" color="medium">
                  Auxiliary Pioneer
                </Body>
              </IonCol>
            </IonRow>
          )}
          {credit_hours && Object.keys(credit_hours).length > 0 && (
            <IonRow>
              <IonCol className="ion-padding-start">
                {Object.entries(credit_hours).map(([key, val]) => (
                  <div key={key}>
                    <Body size="xs" color="medium">
                      {`${key.toUpperCase()}: ${val}hr`}
                    </Body>
                  </div>
                ))}
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <IonCol className="ion-padding-start">
              {comments && (
                <Body size="xs" color="medium">
                  {comments}
                </Body>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonLabel>
      <IonIcon
        slot="end"
        icon={checkmarkCircleOutline}
        color={active === null ? "medium" : active ? "success" : "danger"}
      />
    </IonItem>
  );
}
