import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function HelpTextHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/app" />
      </IonButtons>
      <IonTitle>Help Text</IonTitle>
    </IonToolbar>
  );
}
