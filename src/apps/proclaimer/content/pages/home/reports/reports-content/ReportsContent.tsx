import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { getPreviousMonthDate } from "@util/format/report-date";
import { usePermissionedPublishers } from "./hooks/usePermissionedPublishers";
import { PublisherReportItem } from "./components/publisher-report-item/PublisherReportItem";

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
