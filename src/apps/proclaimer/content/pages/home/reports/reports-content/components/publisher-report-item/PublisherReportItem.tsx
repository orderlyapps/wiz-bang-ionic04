import { useState } from "react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { usePublisherReport } from "../../hooks/usePublisherReport";
import { ReportItem } from "../report-item/ReportItem";
import { PublisherReportModal } from "../publisher-report-modal/PublisherReportModal";

interface PublisherReportItemProps {
  publisher: Publisher;
  date: string;
}

export function PublisherReportItem({ publisher, date }: PublisherReportItemProps) {
  const [is_open, set_is_open] = useState(false);
  const { confidential_id, report } = usePublisherReport(publisher.id, date);
  const publisher_name = getPublisherDisplayName(publisher, "last_first");

  return (
    <>
      <ReportItem
        label={publisher_name}
        active={report?.active ?? null}
        aux_pio={report?.aux_pio ?? null}
        hours={report?.hours ?? null}
        bible_studies={report?.bible_studies ?? null}
        credit_hours={report?.credit_hours ?? null}
        comments={report?.comments ?? null}
        button
        detail
        disabled={!confidential_id}
        onClick={() => set_is_open(true)}
      />
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
