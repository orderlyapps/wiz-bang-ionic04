import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function FeatureGuardHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/app" />
      </IonButtons>
      <IonTitle>Feature Guard</IonTitle>
    </IonToolbar>
  );
}
