import { and, eq, gte, useLiveQuery } from "@tanstack/react-db";
import { format, startOfWeek } from "date-fns";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { cleanMajorCollection } from "@shared/database/collections/clean-major";
import { cleanMinorCollection } from "@shared/database/collections/clean-minor";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { avAssignmentLabels } from "@shared/database/schemas/av-assignment";
import { weekendAssignmentLabels } from "@shared/database/schemas/weekend-assignment";
import { useMidweekAssignments } from "./useMidweekAssignments";

export type AssignmentType =
  | "av"
  | "midweek"
  | "speaker"
  | "weekend"
  | "clean-major"
  | "clean-minor";

export type Assignment = {
  id: string;
  type: AssignmentType;
  week_id: string;
  label: string;
};

const typeLabels: Record<AssignmentType, string> = {
  av: "AV",
  midweek: "Midweek",
  speaker: "Public Talk",
  weekend: "Weekend",
  "clean-major": "Major Cleaning",
  "clean-minor": "Minor Cleaning",
};

export function getAssignmentLabel(type: AssignmentType, assignmentId?: string): string {
  if (type === "av" && assignmentId) {
    const base = avAssignmentLabels[assignmentId] ?? assignmentId;
    if (assignmentId.endsWith("_midweek")) return `${base} (Midweek)`;
    if (assignmentId.endsWith("_weekend")) return `${base} (Weekend)`;
    return base;
  }
  if (type === "weekend" && assignmentId) {
    const base = weekendAssignmentLabels[assignmentId] ?? assignmentId;
    if (assignmentId === "chairman") return `${base} (Weekend)`;
    if (assignmentId === "reader") return `${base} (Watchtower)`;
    return base;
  }
  return typeLabels[type];
}

export function useAssignments() {
  const publisher = useStoredPublisher();
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id ?? "";
  const publisher_id = publisher?.id ?? "";
  const group_id = publisher?.group_id ?? "";
  const today_str = format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");

  const { data: av, isLoading: isLoadingAv } = useLiveQuery(
    (q) =>
      congregation_id && publisher_id
        ? q
            .from({ a: avAssignmentCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id),
                eq(a.participant_id, publisher_id),
                gte(a.week_id, today_str),
              ),
            )
            .orderBy(({ a }) => a.week_id)
        : undefined,
    [congregation_id, publisher_id, today_str],
  );

  const { assignments: midweek, is_loading: isLoadingMidweek } = useMidweekAssignments(
    congregation_id,
    publisher_id,
    today_str,
  );

  const { data: weekend, isLoading: isLoadingWeekend } = useLiveQuery(
    (q) =>
      congregation_id && publisher_id
        ? q
            .from({ a: weekendAssignmentCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id),
                eq(a.participant_id, publisher_id),
                gte(a.week_id, today_str),
              ),
            )
            .orderBy(({ a }) => a.week_id)
        : undefined,
    [congregation_id, publisher_id, today_str],
  );

  const { data: speaker, isLoading: isLoadingSpeaker } = useLiveQuery(
    (q) =>
      congregation_id && publisher_id
        ? q
            .from({ a: speakerAssignmentCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id),
                eq(a.speaker_id, publisher_id),
                gte(a.week_id, today_str),
              ),
            )
            .orderBy(({ a }) => a.week_id)
        : undefined,
    [congregation_id, publisher_id, today_str],
  );

  const { data: cleanMajor, isLoading: isLoadingCleanMajor } = useLiveQuery(
    (q) =>
      group_id
        ? q
            .from({ a: cleanMajorCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id),
                eq(a.group_id, group_id),
                gte(a.week_id, today_str),
              ),
            )
            .orderBy(({ a }) => a.week_id)
        : undefined,
    [congregation_id, group_id, today_str],
  );

  const { data: cleanMinor, isLoading: isLoadingCleanMinor } = useLiveQuery(
    (q) =>
      group_id
        ? q
            .from({ a: cleanMinorCollection })
            .where(({ a }) =>
              and(
                eq(a.congregation_id, congregation_id),
                eq(a.group_id, group_id),
                gte(a.week_id, today_str),
              ),
            )
            .orderBy(({ a }) => a.week_id)
        : undefined,
    [congregation_id, group_id, today_str],
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
    ...(cleanMajor?.map((a) => ({
      id: `${a.week_id}-clean-major`,
      type: "clean-major" as const,
      week_id: a.week_id,
      label: getAssignmentLabel("clean-major"),
    })) ?? []),
    ...(cleanMinor?.map((a) => ({
      id: `${a.week_id}-clean-minor`,
      type: "clean-minor" as const,
      week_id: a.week_id,
      label: getAssignmentLabel("clean-minor"),
    })) ?? []),
  ].sort((a, b) => a.week_id.localeCompare(b.week_id));

  const is_loading =
    isLoadingAv ||
    isLoadingMidweek ||
    isLoadingWeekend ||
    isLoadingSpeaker ||
    isLoadingCleanMajor ||
    isLoadingCleanMinor;

  return { assignments, is_loading };
}
