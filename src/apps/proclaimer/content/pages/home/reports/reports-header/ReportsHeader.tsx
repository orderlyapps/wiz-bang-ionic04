import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { DownloadReportFormButton } from "@proclaimer-content/pages/home/reports/reports-header/components/download-report-form-button/DownloadReportFormButton";

export function ReportsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Reports</IonTitle>
      <IonButtons slot="end">
        <DownloadReportFormButton />
      </IonButtons>
    </IonToolbar>
  );
}
