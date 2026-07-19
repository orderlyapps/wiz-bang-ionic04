import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import type { Report } from "@shared/database/schemas/report";

export function usePublisherReports(publisher_id: string | undefined) {
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

  const { data: reports, isLoading } = useLiveQuery(
    (q) => {
      if (!confidential_id) return undefined;
      return q
        .from({ r: reportCollection })
        .where(({ r }) => eq(r.confidential_id, confidential_id));
    },
    [confidential_id],
  );

  return {
    confidential_id,
    reports: (reports ?? []) as Report[],
    isLoading,
  };
}
