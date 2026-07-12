import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { usePermissionedPublishers } from "./hooks/usePermissionedPublishers";
import { PublisherReportItem } from "./components/publisher-report-item/PublisherReportItem";

const getPreviousMonthDate = (): string => {
  const now = new Date();
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = now.getMonth() === 0 ? 12 : now.getMonth();
  return `${year}-${String(month).padStart(2, "0")}-01`;
};

export function ReportsContent() {
  const { publishers, has_access, isLoading } = usePermissionedPublishers();
  const report_date = getPreviousMonthDate();

  if (isLoading) {
    return (
      <IonItem lines="none" className="ion-text-center ion-margin ion-padding">
        <IonLabel color="medium">Loading...</IonLabel>
      </IonItem>
    );
  }

  if (!has_access) {
    return (
      <IonItem lines="none" className="ion-padding">
        <IonLabel>
          <Body color="medium">You do not have permission to edit any group reports.</Body>
        </IonLabel>
      </IonItem>
    );
  }

  return (
    <IonList>
      {publishers.map((publisher) => (
        <PublisherReportItem key={publisher.id} publisher={publisher} date={report_date} />
      ))}
    </IonList>
  );
}
