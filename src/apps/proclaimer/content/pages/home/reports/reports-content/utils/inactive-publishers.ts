import { subMonths, format } from "date-fns";
import type { Report } from "@shared/database/schemas/report";

export function getLastSixMonthDates(): string[] {
  const dates: string[] = [];
  for (let i = 1; i <= 6; i++) {
    dates.push(format(subMonths(new Date(), i), "yyyy-MM-01"));
  }
  return dates;
}

export function getInactivePublisherIds(
  reports: Report[],
  confidential_ids: string[],
  months?: string[],
): string[] {
  const six_month_dates = months ?? getLastSixMonthDates();
  const inactive: string[] = [];
  for (const confidential_id of confidential_ids) {
    const publisher_reports = reports.filter(
      (r) => r.confidential_id === confidential_id && six_month_dates.includes(r.date),
    );
    if (publisher_reports.length > 0 && publisher_reports.every((r) => !r.active)) {
      inactive.push(confidential_id);
    }
  }
  return inactive;
}
