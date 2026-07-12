import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ThemeHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/app" />
      </IonButtons>
      <IonTitle>Theme</IonTitle>
    </IonToolbar>
  );
}
