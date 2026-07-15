import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ToolsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>Tools</IonTitle>
    </IonToolbar>
  );
}
