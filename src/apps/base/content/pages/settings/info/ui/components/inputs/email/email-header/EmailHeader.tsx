import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function EmailHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Email</IonTitle>
    </IonToolbar>
  );
}
