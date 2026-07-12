import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function UtilHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info" />
      </IonButtons>
      <IonTitle>Util</IonTitle>
    </IonToolbar>
  );
}
