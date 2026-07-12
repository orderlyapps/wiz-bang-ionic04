import { useState } from "react";
import { IonChip, IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@ui/components/layout/space/Space";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import {
  weekendAVAssignmentIDs,
  weekendAttendantAssignmentIDs,
} from "@shared/database/schemas/av-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import { useWeekendPresets } from "../../hooks/use-weekend-presets/useWeekendPresets";
import { useWeekendPublisherStats } from "../../hooks/use-weekend-publisher-stats/useWeekendPublisherStats";
import { weekendParticipationCollection } from "@shared/database/collections/weekend-participation";
import type { WeekendParticipation } from "@shared/database/schemas/weekend-participation";
import { WeekendFilterSelect } from "../weekend-filter-select/WeekendFilterSelect";
import { WeekendConfirmModal } from "./components/weekend-confirm-modal/WeekendConfirmModal";

interface WeekendPublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  week_id: string;
  assignment_id: string;
  on_select: (publisher_id: string) => void;
}

export function WeekendPublisherList({
  publishers,
  selected_id,
  week_id,
  assignment_id,
  on_select,
}: WeekendPublisherListProps) {
  const [confirm_publisher, set_confirm_publisher] = useState<Publisher | undefined>(undefined);
  const presets_api = useWeekendPresets(assignment_id);
  const {
    participation_types,
    stat_participation_types,
    min_weeks_away_closest,
    min_avg_weeks_between,
  } = presets_api.active_preset.filter;
  const sort_order = presets_api.active_preset.sort_order;

  const stats = useWeekendPublisherStats(stat_participation_types, week_id);

  const { data: allParticipations } = useLiveQuery((q) =>
    q.from({ wp: weekendParticipationCollection }),
  );
  const participation_type_set = new Set(participation_types);
  const participant_ids = new Set(
    ((allParticipations as WeekendParticipation[] | undefined) ?? [])
      .filter((p) => participation_type_set.has(p.participation_id))
      .map((p) => p.participant_id),
  );
  const { data: allAvAssignments } = useLiveQuery((q) => q.from({ aa: avAssignmentCollection }));
  const { data: allWeekendAssignments } = useLiveQuery((q) =>
    q.from({ wa: weekendAssignmentCollection }),
  );
  const { data: allSpeakerAssignments } = useLiveQuery((q) =>
    q.from({ sa: speakerAssignmentCollection }),
  );

  const weekendAvIds = new Set<string>([
    ...weekendAVAssignmentIDs,
    ...weekendAttendantAssignmentIDs,
  ]);

  const busyPublisherIds = new Set<string>();

  ((allAvAssignments as AvAssignment[] | undefined) ?? [])
    .filter((a) => a.week_id === week_id && weekendAvIds.has(a.assignment_id))
    .forEach((a) => busyPublisherIds.add(a.participant_id));

  ((allWeekendAssignments as WeekendAssignment[] | undefined) ?? [])
    .filter((a) => a.week_id === week_id)
    .forEach((a) => busyPublisherIds.add(a.participant_id));

  ((allSpeakerAssignments as SpeakerAssignment[] | undefined) ?? [])
    .filter((a) => a.week_id === week_id)
    .forEach((a) => busyPublisherIds.add(a.speaker_id));

  const active = publishers.filter((p) => {
    if (p.archived_at) return false;
    if (p.gender !== "male") return false;
    if (p.id && !participant_ids.has(p.id)) return false;
    const pub_stats = p.id ? stats.get(p.id) : undefined;
    if (min_weeks_away_closest > 0) {
      const w = pub_stats?.weeks_away_closest;
      if (w !== null && w !== undefined && w < min_weeks_away_closest) return false;
    }
    if (min_avg_weeks_between > 0) {
      const a = pub_stats?.avg_weeks_between;
      if (a !== null && a !== undefined && a < min_avg_weeks_between) return false;
    }
    return true;
  });

  const sorted = [...active].sort((a, b) => {
    if (sort_order === "alphabetical") {
      return a.last_name.localeCompare(b.last_name) || a.first_name.localeCompare(b.first_name);
    }
    const sa = a.id ? stats.get(a.id) : undefined;
    const sb = b.id ? stats.get(b.id) : undefined;
    const va = sort_order === "weeks_away_closest" ? sa?.weeks_away_closest : sa?.avg_weeks_between;
    const vb = sort_order === "weeks_away_closest" ? sb?.weeks_away_closest : sb?.avg_weeks_between;
    if (va === null || va === undefined) return 1;
    if (vb === null || vb === undefined) return -1;
    return vb - va;
  });

  function getStatLabel(publisher_id: string | undefined): string | undefined {
    if (!publisher_id) return undefined;
    const s = stats.get(publisher_id);
    if (!s) return undefined;
    if (sort_order === "weeks_away_closest" && s.weeks_away_closest !== null) {
      return `${s.weeks_away_closest}w`;
    }
    if (sort_order === "avg_weeks_between" && s.avg_weeks_between !== null) {
      return `~${Math.round(s.avg_weeks_between)}w`;
    }
    return undefined;
  }

  return (
    <>
      <WeekendFilterSelect
        presets={presets_api.presets}
        active_preset={presets_api.active_preset}
        is_default_active={presets_api.is_default_active}
        on_select_preset={presets_api.selectPreset}
        on_create_preset={presets_api.createPreset}
        on_rename_preset={presets_api.renamePreset}
        on_delete_preset={presets_api.deletePreset}
        on_change={presets_api.updatePreset}
      />
      {active.length === 0 ? (
        <IonList className="ion-margin" inset>
          <IonItem>
            <IonLabel color="medium">No publishers found.</IonLabel>
          </IonItem>
        </IonList>
      ) : null}
      <MultiColumnList<Publisher>
        items={sorted}
        get_id={(p) => p.id ?? ""}
        render_item={(p) => {
          const is_selected = selected_id === p.id;
          const is_busy = !is_selected && !!p.id && busyPublisherIds.has(p.id);
          const stat_label = getStatLabel(p.id);
          return (
            <IonItem
              button
              detail={false}
              color={is_selected ? "primary" : undefined}
              onClick={() => set_confirm_publisher(p)}
            >
              <IonLabel color={is_busy ? "warning" : undefined}>
                {getPublisherDisplayName(p)}
              </IonLabel>
              {stat_label && !is_selected && <IonChip color="medium">{stat_label}</IonChip>}
            </IonItem>
          );
        }}
      />
      <Space size="2xl" />
      <WeekendConfirmModal
        is_open={confirm_publisher !== undefined}
        publisher={confirm_publisher}
        week_id={week_id}
        weekend_assignments={(allWeekendAssignments as WeekendAssignment[] | undefined) ?? []}
        speaker_assignments={(allSpeakerAssignments as SpeakerAssignment[] | undefined) ?? []}
        av_assignments={(allAvAssignments as AvAssignment[] | undefined) ?? []}
        on_dismiss={() => set_confirm_publisher(undefined)}
        on_confirm={() => on_select(confirm_publisher?.id ?? "")}
      />
    </>
  );
}
