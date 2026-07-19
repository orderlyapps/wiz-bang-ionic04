import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";

export function useReportedPublisherIds(date: string): {
  reported_publisher_ids: Set<string>;
  isLoading: boolean;
} {
  const { data: local_publishers, isLoading: local_loading } = useLiveQuery((q) =>
    q.from({ pl: publisherLocalCollection }),
  );

  const { data: reports, isLoading: reports_loading } = useLiveQuery(
    (q) => q.from({ r: reportCollection }).where(({ r }) => eq(r.date, date)),
    [date],
  );

  const confidential_to_publisher = new Map<string, string>();
  for (const local of local_publishers ?? []) {
    confidential_to_publisher.set(local.confidential_id, local.publisher_id);
  }

  const reported_publisher_ids = new Set<string>();
  for (const report of reports ?? []) {
    const publisher_id = confidential_to_publisher.get(report.confidential_id);
    if (publisher_id) {
      reported_publisher_ids.add(publisher_id);
    }
  }

  return {
    reported_publisher_ids,
    isLoading: local_loading || reports_loading,
  };
}
