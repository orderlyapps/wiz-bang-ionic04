import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton } from "@ionic/react";
import { Icon } from "@ui/components/icons/Icon";

export function CleaningHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Cleaning</IonTitle>
      <IonButtons slot="end">
        <IonButton routerLink="/home/elder/cleaning-schedule">
          <Icon slot="icon-only" name="pdf" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
}
