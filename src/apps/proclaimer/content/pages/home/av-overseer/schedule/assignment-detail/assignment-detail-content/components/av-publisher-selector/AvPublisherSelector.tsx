import { useState } from "react";
import { useLiveQuery } from "@tanstack/react-db";
import { avAssignmentCollection } from "@shared/database/collections/av-assignment";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { weekendAssignmentCollection } from "@shared/database/collections/weekend-assignment";
import { speakerAssignmentCollection } from "@shared/database/collections/speaker-assignment";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { WeekendAssignment } from "@shared/database/schemas/weekend-assignment";
import type { SpeakerAssignment } from "@shared/database/schemas/speaker-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { AvAssignmentID } from "@shared/database/schemas/av-assignment";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { avParticipationTypeMap } from "../../utils/avParticipationTypeMap";
import { useAvPresets } from "../../hooks/use-av-presets/useAvPresets";
import type { AvPublisherFilter, PublisherSortOrder } from "../../hooks/use-av-presets/types";
import { useAvPublisherStats } from "../../hooks/use-av-publisher-stats/useAvPublisherStats";
import { useAvPublisherParticipationTypes } from "../../hooks/use-av-publisher-participation-types/useAvPublisherParticipationTypes";
import { AvFilterSelect } from "../av-filter-select/AvFilterSelect";
import { AvPublisherList } from "../av-publisher-list/AvPublisherList";
import { AvConfirmModal } from "../av-publisher-list/components/av-confirm-modal/AvConfirmModal";

interface AvPublisherSelectorProps {
  publishers: Publisher[];
  assignment: AvAssignment | undefined;
  assignment_id: AvAssignmentID;
  week_id: string;
  on_select: (publisher_id: string) => void;
}

export function AvPublisherSelector({
  publishers,
  assignment,
  assignment_id,
  week_id,
  on_select,
}: AvPublisherSelectorProps) {
  const congregation_id = getStoredCongregation()?.id;
  const participation_type = avParticipationTypeMap[assignment_id];

  const presets_api = useAvPresets(participation_type);

  const stats = useAvPublisherStats(
    participation_type,
    week_id,
    congregation_id,
    presets_api.active_preset.filter.stat_participation_types,
  );

  const participation_types = useAvPublisherParticipationTypes();

  const { data: allAssignments } = useLiveQuery((q) => q.from({ aa: avAssignmentCollection }));
  const { data: allMidweekAssignments } = useLiveQuery((q) =>
    q.from({ ma: midweekAssignmentCollection }),
  );
  const { data: allWeekendAssignments } = useLiveQuery((q) =>
    q.from({ wa: weekendAssignmentCollection }),
  );
  const { data: allSpeakerAssignments } = useLiveQuery((q) =>
    q.from({ sa: speakerAssignmentCollection }),
  );

  const is_midweek = assignment_id.includes("midweek");
  const av_publisher_ids = ((allAssignments as AvAssignment[] | undefined) ?? [])
    .filter(
      (a) =>
        a.week_id === week_id &&
        a.participant_id &&
        a.assignment_id.includes(is_midweek ? "midweek" : "weekend"),
    )
    .map((a) => a.participant_id);

  const clam_publisher_ids = is_midweek
    ? ((allMidweekAssignments as MidweekAssignment[] | undefined) ?? [])
        .filter((a) => a.week_id === week_id && a.participant_id)
        .map((a) => a.participant_id)
    : [
        ...((allWeekendAssignments as WeekendAssignment[] | undefined) ?? [])
          .filter((a) => a.week_id === week_id && a.participant_id)
          .map((a) => a.participant_id),
        ...((allSpeakerAssignments as SpeakerAssignment[] | undefined) ?? [])
          .filter((a) => a.week_id === week_id && a.speaker_id)
          .map((a) => a.speaker_id),
      ];

  const publisher_ids_with_week_assignment = new Set([...av_publisher_ids, ...clam_publisher_ids]);

  const [is_modal_open, set_is_modal_open] = useState(false);
  const [selected_publisher, set_selected_publisher] = useState<Publisher | undefined>();

  function handleSelectPublisher(publisher_id: string) {
    const publisher = publishers.find((p) => p.id === publisher_id);
    set_selected_publisher(publisher);
    set_is_modal_open(true);
  }

  function handleConfirm() {
    if (selected_publisher?.id) on_select(selected_publisher.id);
  }

  function handleChange(filter: AvPublisherFilter, sort_order: PublisherSortOrder) {
    presets_api.updatePreset(filter, sort_order);
  }

  return (
    <>
      <AvFilterSelect
        presets={presets_api.presets}
        active_preset={presets_api.active_preset}
        is_default_active={presets_api.is_default_active}
        on_select_preset={presets_api.selectPreset}
        on_create_preset={presets_api.createPreset}
        on_rename_preset={presets_api.renamePreset}
        on_delete_preset={presets_api.deletePreset}
        on_change={handleChange}
      />
      <AvPublisherList
        publishers={publishers}
        selected_id={assignment?.participant_id}
        on_select={handleSelectPublisher}
        sort_order={presets_api.active_preset.sort_order}
        stats={stats}
        filter={presets_api.active_preset.filter}
        participation_types={participation_types}
        publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
      />
      <AvConfirmModal
        is_open={is_modal_open}
        publisher={selected_publisher}
        week_id={week_id}
        assignment_id={assignment_id}
        all_assignments={(allAssignments as AvAssignment[] | undefined) ?? []}
        midweek_assignments={(allMidweekAssignments as MidweekAssignment[] | undefined) ?? []}
        weekend_assignments={(allWeekendAssignments as WeekendAssignment[] | undefined) ?? []}
        speaker_assignments={(allSpeakerAssignments as SpeakerAssignment[] | undefined) ?? []}
        on_dismiss={() => set_is_modal_open(false)}
        on_confirm={handleConfirm}
      />
    </>
  );
}
