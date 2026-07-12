import { useState } from "react";
import { IonItem, IonLabel, IonNote } from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePublisherReport } from "../../hooks/usePublisherReport";
import { PublisherReportModal } from "../publisher-report-modal/PublisherReportModal";

interface PublisherReportItemProps {
  publisher: Publisher;
  date: string;
}

export function PublisherReportItem({ publisher, date }: PublisherReportItemProps) {
  const [is_open, set_is_open] = useState(false);
  const { confidential_id, report } = usePublisherReport(publisher.id, date);
  const has_report = !!report;
  const publisher_name = getPublisherDisplayName(publisher, "last_first");

  return (
    <>
      <IonItem button detail disabled={!confidential_id} onClick={() => set_is_open(true)}>
        <IonLabel color={has_report ? "medium" : undefined}>{publisher_name}</IonLabel>
        {has_report && (
          <IonNote slot="end" color="medium">
            Submitted
          </IonNote>
        )}
      </IonItem>
      {confidential_id && (
        <PublisherReportModal
          is_open={is_open}
          on_dismiss={() => set_is_open(false)}
          publisher_name={publisher_name}
          confidential_id={confidential_id}
          group_id={publisher.group_id ?? null}
          date={date}
          existing_report={report}
        />
      )}
    </>
  );
}
