import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { bookOutline, settingsOutline } from "ionicons/icons";

interface CongregationBibleStudyHeaderProps {
  on_studies: () => void;
  on_settings: () => void;
}

export function CongregationBibleStudyHeader({
  on_studies,
  on_settings,
}: CongregationBibleStudyHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
      <IonTitle>Congregation Bible Study</IonTitle>
      <IonButtons slot="end">
        <IonButton onClick={on_studies}>
          <IonIcon slot="icon-only" icon={bookOutline} />
        </IonButton>
        <IonButton onClick={on_settings}>
          <IonIcon slot="icon-only" icon={settingsOutline} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
}
