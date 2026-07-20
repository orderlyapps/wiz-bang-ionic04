import { and, eq, gte, lte, useLiveQuery } from "@tanstack/react-db";
import { reportCollection } from "@shared/database/collections/report";
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

  const { data: reports, isLoading } = useLiveQuery(
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

  const active_publisher_ids = new Set<string>();
  for (const report of reports ?? []) {
    active_publisher_ids.add(report.confidential_id);
  }

  return {
    active_publishers_count: active_publisher_ids.size,
    isLoading,
  };
}
