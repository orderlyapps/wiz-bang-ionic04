import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import { getServiceYear } from "@util/format/service-year";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Report } from "@shared/database/schemas/report";
import type { PublisherRecordEntry } from "../components/publisher-records-pdf/PublisherRecordsPdf";
import type {
  PublisherRecordData,
  ServiceYearReportData,
  MonthReport,
} from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-content/components/publisher-record-pdf/types";

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

export type PublisherGroup =
  | "elders"
  | "ministerial_servants"
  | "pioneers"
  | "brothers"
  | "inactive";

export const GROUP_LABELS: Record<PublisherGroup, string> = {
  elders: "Elders",
  ministerial_servants: "Ministerial Servants",
  pioneers: "Pioneers",
  brothers: "Brothers (non-elder/MS)",
  inactive: "Inactive",
};

export function filterPublishersByGroup(
  publishers: Publisher[],
  group: PublisherGroup,
): Publisher[] {
  const not_archived = publishers.filter((p) => !p.archived_at);
  switch (group) {
    case "elders":
      return not_archived.filter((p) => p.standing === "elder");
    case "ministerial_servants":
      return not_archived.filter((p) => p.standing === "ministerial_servant");
    case "pioneers":
      return not_archived.filter((p) => p.type === "regular_pioneer");
    case "brothers":
      return not_archived.filter(
        (p) =>
          p.gender === "male" &&
          p.standing !== "elder" &&
          p.standing !== "ministerial_servant" &&
          p.type !== "regular_pioneer" &&
          p.type !== "inactive",
      );
    case "inactive":
      return not_archived.filter((p) => p.type === "inactive");
  }
}

export function usePublisherRecordsData() {
  const congregation_id = getStoredCongregation()?.id;

  const { data: publishers_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const { data: local_data } = useLiveQuery((q) => q.from({ pl: publisherLocalCollection }));

  const { data: reports_data } = useLiveQuery((q) => q.from({ r: reportCollection }));

  const publishers = (publishers_data ?? []).filter(
    (p) => p.congregation_id === congregation_id,
  ) as Publisher[];

  const local_map = new Map<
    string,
    { birth_date: string; baptism_date: string; confidential_id: string }
  >();
  for (const local of local_data ?? []) {
    local_map.set(local.publisher_id, {
      birth_date: local.birth_date ?? "",
      baptism_date: local.baptism_date ?? "",
      confidential_id: local.confidential_id ?? "",
    });
  }

  const report_map = new Map<string, Map<string, Report>>();
  for (const r of reports_data ?? []) {
    const ym = r.date.slice(0, 7);
    const cid = r.confidential_id ?? "";
    let inner = report_map.get(cid);
    if (!inner) {
      inner = new Map<string, Report>();
      report_map.set(cid, inner);
    }
    inner.set(ym, r as Report);
  }

  const current_sy = getServiceYear(new Date());
  const current_start = parseInt(current_sy.split("-")[0], 10);
  const previous_sy = `${current_start - 1}-${current_start}`;

  const buildServiceYear = (sy: string, publisher: Publisher): ServiceYearReportData => {
    const confidential_id = local_map.get(publisher.id ?? "")?.confidential_id ?? "";
    const publisher_reports = report_map.get(confidential_id);
    const start_year = parseInt(sy.split("-")[0], 10);
    const months: MonthReport[] = MONTH_NAMES.map((month_name, i) => {
      const month_num = i < 4 ? i + 9 : i - 3;
      const year = i < 4 ? start_year : start_year + 1;
      const ym = `${year}-${String(month_num).padStart(2, "0")}`;
      const r = publisher_reports?.get(ym);
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

  const buildEntry = (publisher: Publisher): PublisherRecordEntry => {
    const local = local_map.get(publisher.id ?? "");
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
    return {
      publisher: publisher_record,
      reports: [buildServiceYear(current_sy, publisher), buildServiceYear(previous_sy, publisher)],
    };
  };

  function getEntriesForGroup(group: PublisherGroup): PublisherRecordEntry[] {
    const filtered = filterPublishersByGroup(publishers, group);
    return filtered.map(buildEntry);
  }

  function getGroupCount(group: PublisherGroup): number {
    return filterPublishersByGroup(publishers, group).length;
  }

  return { getEntriesForGroup, getGroupCount };
}
