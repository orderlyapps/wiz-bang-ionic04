import { and, gte, lte, eq, useLiveQuery } from "@tanstack/react-db";
import { addWeeks, format, parseISO } from "date-fns";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { congregationCollection } from "@shared/database/collections/congregation";
import { outlineCollection } from "@shared/database/collections/outline";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Congregation } from "@shared/database/schemas/congregation";
import type { Outline } from "@shared/database/schemas/outline";

export type OutgoingSpeaker = {
  readonly speaker_name: string;
  readonly target_congregation: string;
  readonly outline_id: string | null;
};

export type SpeakerWeekData = {
  readonly week_id: string;
  readonly week_label: string;
  readonly speaker_name: string | null;
  readonly speaker_congregation_name: string | null;
  readonly outline_theme: string | null;
  readonly chairman_name: string | null;
  readonly reader_name: string | null;
  readonly outgoing_speakers: OutgoingSpeaker[];
};

export function useSpeakerScheduleData(
  dateRange: { firstMonday: string; lastMonday: string } | null,
): { weeks: SpeakerWeekData[]; isLoading: boolean } {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: speaker_assignments } = useLiveQuery(
    (q) =>
      dateRange
        ? q
            .from({ sa: speakerAssignmentCollection })
            .where(({ sa }) =>
              and(gte(sa.week_id, dateRange.firstMonday), lte(sa.week_id, dateRange.lastMonday)),
            )
        : undefined,
    [dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const { data: weekend_assignments } = useLiveQuery(
    (q) =>
      dateRange && congregation_id
        ? q
            .from({ wa: weekendAssignmentCollection })
            .where(({ wa }) =>
              and(
                eq(wa.congregation_id, congregation_id),
                gte(wa.week_id, dateRange.firstMonday),
                lte(wa.week_id, dateRange.lastMonday),
              ),
            )
        : undefined,
    [congregation_id, dateRange?.firstMonday, dateRange?.lastMonday],
  );

  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }), []);

  const { data: congregations } = useLiveQuery((q) => q.from({ c: congregationCollection }), []);

  const { data: outlines } = useLiveQuery((q) => q.from({ o: outlineCollection }), []);

  const isLoading =
    speaker_assignments === undefined ||
    weekend_assignments === undefined ||
    publishers === undefined ||
    congregations === undefined ||
    outlines === undefined;

  if (!dateRange || isLoading) {
    return { weeks: [], isLoading };
  }

  const publisherMap = new Map<string, Publisher>();
  for (const p of (publishers as Publisher[] | undefined) ?? []) {
    if (p.id) publisherMap.set(p.id, p);
  }

  const congregationMap = new Map<string, Congregation>();
  for (const c of (congregations as Congregation[] | undefined) ?? []) {
    if (c.id) congregationMap.set(c.id, c);
  }

  const outlineMap = new Map<string, Outline>();
  for (const o of (outlines as Outline[] | undefined) ?? []) {
    outlineMap.set(o.id, o);
  }

  const all_speaker_assignments = (speaker_assignments as SpeakerAssignment[] | undefined) ?? [];
  const all_weekend_assignments = (weekend_assignments as WeekendAssignment[] | undefined) ?? [];

  const weeks: SpeakerWeekData[] = [];
  let current = parseISO(dateRange.firstMonday);
  const end = parseISO(dateRange.lastMonday);

  while (current <= end) {
    const week_id = format(current, "yyyy-MM-dd");

    const local_speaker_assignment = all_speaker_assignments.find(
      (a) => a.week_id === week_id && a.congregation_id === congregation_id,
    );

    const speaker = local_speaker_assignment
      ? publisherMap.get(local_speaker_assignment.speaker_id)
      : undefined;
    const speaker_name = speaker ? getPublisherDisplayName(speaker, "first_last") : null;
    const speaker_congregation_name =
      speaker && speaker.congregation_id !== congregation_id
        ? (congregationMap.get(speaker.congregation_id)?.name ?? null)
        : null;
    const outline_theme = local_speaker_assignment?.outline_id
      ? (outlineMap.get(local_speaker_assignment.outline_id)?.theme ?? null)
      : null;

    const chairman_assignment = all_weekend_assignments.find(
      (a) => a.week_id === week_id && a.assignment_id === "chairman",
    );
    const chairman = chairman_assignment
      ? publisherMap.get(chairman_assignment.participant_id)
      : undefined;
    const chairman_name = chairman ? getPublisherDisplayName(chairman, "first_last") : null;

    const reader_assignment = all_weekend_assignments.find(
      (a) => a.week_id === week_id && a.assignment_id === "reader",
    );
    const reader = reader_assignment
      ? publisherMap.get(reader_assignment.participant_id)
      : undefined;
    const reader_name = reader ? getPublisherDisplayName(reader, "first_last") : null;

    const outgoing_assignments = all_speaker_assignments.filter((a) => {
      if (a.week_id !== week_id || a.congregation_id === congregation_id) return false;
      const speaker_pub = publisherMap.get(a.speaker_id);
      return speaker_pub?.congregation_id === congregation_id;
    });

    const outgoing_speakers: OutgoingSpeaker[] = outgoing_assignments.map((a) => {
      const pub = publisherMap.get(a.speaker_id);
      const target_congregation = congregationMap.get(a.congregation_id);
      return {
        speaker_name: pub ? getPublisherDisplayName(pub, "first_last") : "Unknown",
        target_congregation: target_congregation?.name ?? "Unknown",
        outline_id: a.outline_id ?? null,
      };
    });

    weeks.push({
      week_id,
      week_label: getTheocraticWeekLabel(week_id, { format: "week-range-capital-case" }),
      speaker_name,
      speaker_congregation_name,
      outline_theme,
      chairman_name,
      reader_name,
      outgoing_speakers,
    });

    current = addWeeks(current, 1);
  }

  return { weeks, isLoading };
}
