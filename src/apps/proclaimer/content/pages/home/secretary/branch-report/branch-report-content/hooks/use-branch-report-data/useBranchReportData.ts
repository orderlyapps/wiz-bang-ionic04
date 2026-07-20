import { and, eq, gte, lte, useLiveQuery } from "@tanstack/react-db";
import { reportCollection } from "@shared/database/collections/report";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";

function formatMonthDate(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-01`;
}

export function useBranchReportData() {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 6, 1);
  const end = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const start_date = formatMonthDate(start.getFullYear(), start.getMonth());
  const end_date = formatMonthDate(end.getFullYear(), end.getMonth());
  const previous_month_date = end_date;

  const { data: reports, isLoading: reports_loading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ r: reportCollection })
            .where(({ r }) =>
              and(
                eq(r.congregation_id, congregation_id),
                eq(r.active, true),
                gte(r.date, start_date),
                lte(r.date, end_date),
              ),
            )
        : undefined,
    [congregation_id, start_date, end_date],
  );

  const { data: previous_month_reports, isLoading: prev_reports_loading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ r: reportCollection })
            .where(({ r }) =>
              and(
                eq(r.congregation_id, congregation_id),
                eq(r.date, previous_month_date),
                eq(r.active, true),
                eq(r.aux_pio, false),
              ),
            )
        : undefined,
    [congregation_id, previous_month_date],
  );

  const { data: aux_pio_reports, isLoading: aux_pio_loading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ r: reportCollection })
            .where(({ r }) =>
              and(
                eq(r.congregation_id, congregation_id),
                eq(r.date, previous_month_date),
                eq(r.active, true),
                eq(r.aux_pio, true),
              ),
            )
        : undefined,
    [congregation_id, previous_month_date],
  );

  const { data: all_active_prev_month_reports, isLoading: all_prev_loading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ r: reportCollection })
            .where(({ r }) =>
              and(
                eq(r.congregation_id, congregation_id),
                eq(r.date, previous_month_date),
                eq(r.active, true),
              ),
            )
        : undefined,
    [congregation_id, previous_month_date],
  );

  const { data: local_publishers, isLoading: local_publishers_loading } = useLiveQuery((q) =>
    q.from({ pl: publisherLocalCollection }),
  );

  const { data: publishers, isLoading: publishers_loading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  const confidential_to_publisher_id = new Map<string, string>();
  for (const local of local_publishers ?? []) {
    confidential_to_publisher_id.set(local.confidential_id, local.publisher_id);
  }

  const publisher_by_id = new Map<string, string>();
  const non_archived_publisher_ids = new Set<string>();
  for (const pub of publishers ?? []) {
    if (pub.id) {
      publisher_by_id.set(pub.id, pub.type);
      if (!pub.archived_at) non_archived_publisher_ids.add(pub.id);
    }
  }

  const non_archived_confidential_ids = new Set<string>();
  for (const [confidential_id, publisher_id] of confidential_to_publisher_id) {
    if (non_archived_publisher_ids.has(publisher_id)) {
      non_archived_confidential_ids.add(confidential_id);
    }
  }

  const active_publisher_ids = new Set<string>();
  for (const report of reports ?? []) {
    if (non_archived_confidential_ids.has(report.confidential_id)) {
      active_publisher_ids.add(report.confidential_id);
    }
  }

  let publisher_reports_count = 0;
  let publisher_bible_studies = 0;
  for (const report of previous_month_reports ?? []) {
    if (!non_archived_confidential_ids.has(report.confidential_id)) continue;
    const publisher_id = confidential_to_publisher_id.get(report.confidential_id);
    if (publisher_id && publisher_by_id.get(publisher_id) === "publisher") {
      publisher_reports_count++;
      publisher_bible_studies += report.bible_studies ?? 0;
    }
  }

  let aux_pio_reports_count = 0;
  let aux_pio_hours = 0;
  let aux_pio_bible_studies = 0;
  for (const report of aux_pio_reports ?? []) {
    if (!non_archived_confidential_ids.has(report.confidential_id)) continue;
    aux_pio_reports_count++;
    aux_pio_hours += report.hours ?? 0;
    aux_pio_bible_studies += report.bible_studies ?? 0;
  }

  let regular_pio_reports_count = 0;
  let regular_pio_hours = 0;
  let regular_pio_bible_studies = 0;
  for (const report of all_active_prev_month_reports ?? []) {
    if (!non_archived_confidential_ids.has(report.confidential_id)) continue;
    const publisher_id = confidential_to_publisher_id.get(report.confidential_id);
    if (publisher_id && publisher_by_id.get(publisher_id) === "regular_pioneer") {
      regular_pio_reports_count++;
      regular_pio_hours += report.hours ?? 0;
      regular_pio_bible_studies += report.bible_studies ?? 0;
    }
  }

  return {
    active_publishers_count: active_publisher_ids.size,
    publisher_reports_count,
    publisher_bible_studies,
    aux_pio_reports_count,
    aux_pio_hours,
    aux_pio_bible_studies,
    regular_pio_reports_count,
    regular_pio_hours,
    regular_pio_bible_studies,
    isLoading:
      reports_loading ||
      prev_reports_loading ||
      aux_pio_loading ||
      all_prev_loading ||
      local_publishers_loading ||
      publishers_loading,
  };
}
