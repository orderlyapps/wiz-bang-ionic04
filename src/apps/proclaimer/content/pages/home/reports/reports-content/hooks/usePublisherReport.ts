import { useLiveQuery, eq, and } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";

export function usePublisherReport(publisher_id: string | undefined, date: string) {
  const { data: local_data } = useLiveQuery(
    (q) => {
      if (!publisher_id) return undefined;
      return q
        .from({ pl: publisherLocalCollection })
        .where(({ pl }) => eq(pl.publisher_id, publisher_id));
    },
    [publisher_id],
  );

  const confidential_id = local_data?.[0]?.confidential_id;

  const { data: report_data } = useLiveQuery(
    (q) => {
      if (!confidential_id) return undefined;
      return q
        .from({ r: reportCollection })
        .where(({ r }) => and(eq(r.confidential_id, confidential_id), eq(r.date, date)));
    },
    [confidential_id, date],
  );

  return {
    confidential_id,
    report: report_data?.[0],
  };
}
