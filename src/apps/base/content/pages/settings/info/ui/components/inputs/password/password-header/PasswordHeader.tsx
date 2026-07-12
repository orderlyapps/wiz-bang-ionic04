import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function PasswordHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Password</IonTitle>
    </IonToolbar>
  );
}
