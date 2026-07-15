import { useLiveQuery, eq, and, inArray, isNull } from "@tanstack/react-db";
import { subMonths, format } from "date-fns";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Publisher } from "@shared/database/schemas/publisher";

const PUBLISHER_TYPES = [
  "publisher",
  "regular_pioneer",
  "special_pioneer",
  "continuous_auxiliary",
];

function getLastSixMonthDates(): string[] {
  const dates: string[] = [];
  for (let i = 1; i <= 6; i++) {
    dates.push(format(subMonths(new Date(), i), "yyyy-MM-01"));
  }
  return dates;
}

export function useInactivePublishers() {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;
  const six_month_dates = getLastSixMonthDates();

  const { data: publishers, isLoading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ p: publisherCollection })
            .where(({ p }) =>
              and(
                eq(p.congregation_id, congregation_id),
                inArray(p.type, PUBLISHER_TYPES),
                isNull(p.archived_at),
              ),
            )
            .orderBy(({ p }) => p.last_name)
        : undefined,
    [congregation_id],
  );

  const { data: local_publishers } = useLiveQuery((q) =>
    q.from({ pl: publisherLocalCollection }),
  );

  const { data: reports } = useLiveQuery((q) => q.from({ r: reportCollection }));

  const publisher_by_confidential = new Map<string, Publisher>();
  for (const local of local_publishers ?? []) {
    const pub = (publishers ?? []).find((p) => p.id === local.publisher_id);
    if (pub) {
      publisher_by_confidential.set(local.confidential_id, pub);
    }
  }

  const inactive_publishers: Publisher[] = [];
  for (const [confidential_id, publisher] of publisher_by_confidential) {
    const publisher_reports = (reports ?? []).filter(
      (r) => r.confidential_id === confidential_id && six_month_dates.includes(r.date),
    );
    if (publisher_reports.length > 0 && publisher_reports.every((r) => !r.active)) {
      inactive_publishers.push(publisher);
    }
  }

  return { inactive_publishers, isLoading };
}
