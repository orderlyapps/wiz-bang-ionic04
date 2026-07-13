import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import { Body } from "@ui/components/display/text/body/Body";

export function WarningBanner() {
  return (
    <IonCard color="warning">
      <IonCardHeader>
        <IonCardTitle>
          <IonIcon
            icon={warningOutline}
            color="warning"
            style={{ verticalAlign: "middle", marginRight: 8 }}
          />
          Work in Progress
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <Body size="sm" color="medium">
          This feature is still being developed. Please keep tracking your hours elsewhere.
          Suggestions are welcome!
        </Body>
      </IonCardContent>
    </IonCard>
  );
}
