import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { format, startOfWeek } from "date-fns";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { useMidweekAssignments } from "@proclaimer-content/pages/home/assignments/useMidweekAssignments";
import {
  type Assignment,
  getAssignmentLabel,
} from "@proclaimer-content/pages/home/assignments/useAssignments";

export function usePublisherAssignments(publisher_id: string): { assignments: Assignment[] } {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id ?? "";
  const today_str = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  const { data: av } = useLiveQuery(
    (q) =>
      q
        .from({ a: avAssignmentCollection })
        .where(({ a }) =>
          and(
            eq(a.congregation_id, congregation_id),
            eq(a.participant_id, publisher_id),
            gte(a.week_id, today_str),
          ),
        )
        .orderBy(({ a }) => a.week_id),
    [congregation_id, publisher_id, today_str],
  );

  const midweek = useMidweekAssignments(congregation_id, publisher_id, today_str);

  const { data: weekend } = useLiveQuery(
    (q) =>
      q
        .from({ a: weekendAssignmentCollection })
        .where(({ a }) =>
          and(
            eq(a.congregation_id, congregation_id),
            eq(a.participant_id, publisher_id),
            gte(a.week_id, today_str),
          ),
        )
        .orderBy(({ a }) => a.week_id),
    [congregation_id, publisher_id, today_str],
  );

  const { data: speaker } = useLiveQuery(
    (q) =>
      q
        .from({ a: speakerAssignmentCollection })
        .where(({ a }) =>
          and(
            eq(a.congregation_id, congregation_id),
            eq(a.speaker_id, publisher_id),
            gte(a.week_id, today_str),
          ),
        )
        .orderBy(({ a }) => a.week_id),
    [congregation_id, publisher_id, today_str],
  );

  const assignments: Assignment[] = [
    ...(av?.map((a) => ({
      id: `${a.week_id}-av-${a.assignment_id}`,
      type: "av" as const,
      week_id: a.week_id,
      label: getAssignmentLabel("av", a.assignment_id),
    })) ?? []),
    ...midweek,
    ...(weekend?.map((a) => ({
      id: `${a.week_id}-weekend-${a.assignment_id}`,
      type: "weekend" as const,
      week_id: a.week_id,
      label: getAssignmentLabel("weekend", a.assignment_id),
    })) ?? []),
    ...(speaker?.map((a) => ({
      id: `${a.week_id}-speaker`,
      type: "speaker" as const,
      week_id: a.week_id,
      label: getAssignmentLabel("speaker"),
    })) ?? []),
  ].sort((a, b) => a.week_id.localeCompare(b.week_id));

  return { assignments };
}
