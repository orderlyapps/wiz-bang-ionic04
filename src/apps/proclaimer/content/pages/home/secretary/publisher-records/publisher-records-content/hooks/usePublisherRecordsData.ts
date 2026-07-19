import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Report } from "@shared/database/schemas/report";
import type { PublisherRecordEntry } from "../components/publisher-records-pdf/PublisherRecordsPdf";
import type { PublisherRecordData } from "@proclaimer-content/pages/home/reports/reports-content/components/publisher-record-pdf/types";
import { buildServiceYearReports } from "@proclaimer-content/pages/home/reports/reports-content/utils/service-year-reports";

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
    const confidential_id = local?.confidential_id ?? "";
    const publisher_reports = report_map.get(confidential_id) ?? new Map<string, Report>();
    return {
      publisher: publisher_record,
      reports: buildServiceYearReports(publisher_reports, publisher.type),
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
