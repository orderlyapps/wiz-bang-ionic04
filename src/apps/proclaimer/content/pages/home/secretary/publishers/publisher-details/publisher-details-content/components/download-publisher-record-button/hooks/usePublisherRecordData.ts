import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Report } from "@shared/database/schemas/report";
import type { PublisherRecordData } from "@proclaimer-content/pages/home/reports/reports-content/components/publisher-record-pdf/types";
import {
  buildServiceYearReports,
  reportsToMap,
} from "@proclaimer-content/pages/home/reports/reports-content/utils/service-year-reports";

export function usePublisherRecordData(publisher_id: string) {
  const { data: publisher_data } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
    [publisher_id],
  );

  const { data: local_data } = useLiveQuery(
    (q) =>
      q.from({ pl: publisherLocalCollection }).where(({ pl }) => eq(pl.publisher_id, publisher_id)),
    [publisher_id],
  );

  const confidential_id = local_data?.[0]?.confidential_id;

  const { data: reports } = useLiveQuery(
    (q) => {
      if (!confidential_id) return undefined;
      return q
        .from({ r: reportCollection })
        .where(({ r }) => eq(r.confidential_id, confidential_id));
    },
    [confidential_id],
  );

  const publisher = publisher_data?.[0];
  const local = local_data?.[0];

  if (!publisher) return null;

  const full_name = getPublisherDisplayName(publisher, "complete");
  const publisher_record: PublisherRecordData = {
    full_name,
    first_name: publisher.first_name,
    middle_name: publisher.middle_name ?? null,
    last_name: publisher.last_name,
    display_name: publisher.display_name ?? null,
    gender: publisher.gender,
    type: publisher.type,
    standing: publisher.standing,
    birth_date: local?.birth_date ?? "",
    baptism_date: local?.baptism_date ?? "",
    other_sheep: true,
    anointed: false,
  };

  const report_map = reportsToMap(reports as Report[] | undefined);

  return {
    publisher: publisher_record,
    reports: buildServiceYearReports(report_map, publisher.type),
  };
}
