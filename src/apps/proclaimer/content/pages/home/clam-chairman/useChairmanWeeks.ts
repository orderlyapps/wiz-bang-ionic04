import { and, eq, inArray, useLiveQuery } from "@tanstack/react-db";
import { addWeeks, format, startOfWeek } from "date-fns";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";

export function useChairmanWeeks() {
  const publisher = useStoredPublisher();
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id ?? "";
  const publisher_id = publisher?.id ?? "";

  const current_week = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const next_week = format(startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }), "yyyy-MM-dd");
  const week_ids = [current_week, next_week];

  const { data } = useLiveQuery(
    (q) =>
      congregation_id && publisher_id
        ? q
            .from({ a: midweekAssignmentCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id),
                eq(a.participant_id, publisher_id),
                eq(a.assignment_id, "chairman_1"),
                inArray(a.week_id, week_ids),
              ),
            )
            .orderBy(({ a }) => a.week_id)
        : undefined,
    [congregation_id, publisher_id, current_week, next_week],
  );

  const chairman_week_ids = (data ?? []).map((a) => a.week_id);
  const is_chairman = chairman_week_ids.length > 0;

  return { is_chairman, chairman_week_ids };
}
