import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import { getServiceYear } from "@util/format/service-year";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Report } from "@shared/database/schemas/report";
import type {
  PublisherRecordData,
  ServiceYearReportData,
  MonthReport,
} from "../../publisher-record-pdf/types";

const MONTH_NAMES = [
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
];

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

  const report_map = new Map<string, Report>();
  for (const r of reports ?? []) {
    report_map.set(r.date.slice(0, 7), r as Report);
  }

  const current_sy = getServiceYear(new Date());
  const current_start = parseInt(current_sy.split("-")[0], 10);
  const previous_sy = `${current_start - 1}-${current_start}`;

  const buildServiceYear = (sy: string): ServiceYearReportData => {
    const start_year = parseInt(sy.split("-")[0], 10);
    const months: MonthReport[] = MONTH_NAMES.map((month_name, i) => {
      const month_num = i < 4 ? i + 9 : i - 3;
      const year = i < 4 ? start_year : start_year + 1;
      const ym = `${year}-${String(month_num).padStart(2, "0")}`;
      const r = report_map.get(ym);
      return {
        month_name,
        active: r?.active ?? false,
        bible_studies: r?.bible_studies ?? null,
        auxiliary_pioneer:
          r?.hours != null &&
          publisher.type !== "regular_pioneer" &&
          publisher.type !== "special_pioneer",
        hours: r?.hours ?? null,
        comments: r?.comments ?? null,
      };
    });
    const total_hours = months.reduce((sum, m) => sum + (m.hours ?? 0), 0);
    return { service_year: sy, months, total_hours };
  };

  return {
    publisher: publisher_record,
    reports: [buildServiceYear(current_sy), buildServiceYear(previous_sy)],
  };
}
