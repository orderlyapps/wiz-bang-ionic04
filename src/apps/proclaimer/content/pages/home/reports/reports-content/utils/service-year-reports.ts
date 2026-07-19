import { getServiceYear } from "@util/format/service-year";
import type { Report } from "@shared/database/schemas/report";
import type { MonthReport, ServiceYearReportData } from "../components/publisher-record-pdf/types";

export const SERVICE_YEAR_MONTH_NAMES = [
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

export function buildServiceYear(
  sy: string,
  reports: Map<string, Report>,
  publisher_type?: string,
): ServiceYearReportData {
  const start_year = parseInt(sy.split("-")[0], 10);
  const months: MonthReport[] = SERVICE_YEAR_MONTH_NAMES.map((month_name, i) => {
    const month_num = i < 4 ? i + 9 : i - 3;
    const year = i < 4 ? start_year : start_year + 1;
    const ym = `${year}-${String(month_num).padStart(2, "0")}`;
    const r = reports.get(ym);
    return {
      month_name,
      active: r?.active ?? false,
      bible_studies: r?.bible_studies ?? null,
      auxiliary_pioneer:
        r?.hours != null &&
        publisher_type !== "regular_pioneer" &&
        publisher_type !== "special_pioneer",
      hours: r?.hours ?? null,
      comments: r?.comments ?? null,
    };
  });
  const total_hours = months.reduce((sum, m) => sum + (m.hours ?? 0), 0);
  return { service_year: sy, months, total_hours };
}

export function buildServiceYearReports(
  reports: Map<string, Report>,
  publisher_type?: string,
): ServiceYearReportData[] {
  const current_sy = getServiceYear(new Date());
  const current_start = parseInt(current_sy.split("-")[0], 10);
  const previous_sy = `${current_start - 1}-${current_start}`;
  return [
    buildServiceYear(current_sy, reports, publisher_type),
    buildServiceYear(previous_sy, reports, publisher_type),
  ];
}

export function reportsToMap(reports: Report[] | undefined): Map<string, Report> {
  const map = new Map<string, Report>();
  for (const r of reports ?? []) {
    map.set(r.date.slice(0, 7), r);
  }
  return map;
}
