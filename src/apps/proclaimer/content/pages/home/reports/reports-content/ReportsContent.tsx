import { useState } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { getPreviousMonthDate } from "@util/format/report-date";
import { usePermissionedPublishers } from "./hooks/usePermissionedPublishers";
import { useReportedPublisherIds } from "./hooks/useReportedPublisherIds";
import { PublisherReportItem } from "./components/publisher-report-item/PublisherReportItem";

export function ReportsContent() {
  const { publishers, has_access, isLoading } = usePermissionedPublishers();
  const report_date = getPreviousMonthDate();
  const { reported_publisher_ids } = useReportedPublisherIds(report_date);
  const [show_missing_only, set_show_missing_only] = useState(false);

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

  const visible_publishers = show_missing_only
    ? publishers.filter((p) => !reported_publisher_ids.has(p.id))
    : publishers;

  return (
    <IonList>
      <ToggleInput
        label="Missing only"
        checked={show_missing_only}
        on_change={set_show_missing_only}
      />
      {visible_publishers.map((publisher) => (
        <PublisherReportItem key={publisher.id} publisher={publisher} date={report_date} />
      ))}
    </IonList>
  );
}
