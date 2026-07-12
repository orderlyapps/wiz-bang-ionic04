import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function OtpHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>OTP</IonTitle>
    </IonToolbar>
  );
}
