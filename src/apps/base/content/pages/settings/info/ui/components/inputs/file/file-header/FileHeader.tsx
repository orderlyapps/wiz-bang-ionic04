import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function FileHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>File</IonTitle>
    </IonToolbar>
  );
}
