import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function PdfsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer" />
      </IonButtons>
      <IonTitle>PDFs</IonTitle>
    </IonToolbar>
  );
}
