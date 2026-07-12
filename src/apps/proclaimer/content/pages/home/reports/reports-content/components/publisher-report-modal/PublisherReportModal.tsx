import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type { Report } from "@shared/database/schemas/report";
import { ReportForm } from "./components/report-form/ReportForm";

interface PublisherReportModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  publisher_name: string;
  confidential_id: string;
  group_id: string | null;
  date: string;
  existing_report: Report | undefined;
}

export function PublisherReportModal({
  is_open,
  on_dismiss,
  publisher_name,
  confidential_id,
  group_id,
  date,
  existing_report,
}: PublisherReportModalProps) {
  const month_label = new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{publisher_name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{month_label}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ReportForm
            confidential_id={confidential_id}
            group_id={group_id}
            date={date}
            existing_report={existing_report}
            on_save={on_dismiss}
          />
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
