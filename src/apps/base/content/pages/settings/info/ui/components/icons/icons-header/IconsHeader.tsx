import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function IconsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components" />
      </IonButtons>
      <IonTitle>Icons</IonTitle>
    </IonToolbar>
  );
}
