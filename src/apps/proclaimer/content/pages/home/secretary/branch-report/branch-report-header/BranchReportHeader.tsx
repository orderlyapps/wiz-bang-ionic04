import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function BranchReportHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>Branch Report</IonTitle>
    </IonToolbar>
  );
}
