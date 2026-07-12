import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { DownloadPdfButton } from "./components/download-pdf-button/DownloadPdfButton";

export function GroupsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>Groups</IonTitle>
      <IonButtons slot="end">
        <DownloadPdfButton />
      </IonButtons>
    </IonToolbar>
  );
}
