import { useLiveQuery } from "@tanstack/react-db";
import { PublisherList } from "../publisher-list/PublisherList";
import { PublisherControls } from "./components/publisher-controls/PublisherControls";
import { PublisherSelectModal } from "../publisher-list/components/publisher-select-modal/PublisherSelectModal";
import { PublisherSegment } from "./components/publisher-segment/PublisherSegment";
import { ClearAssignmentButton } from "./components/clear-assignment-button/ClearAssignmentButton";
import { Space } from "@ui/components/layout/space/Space";
import type { Publisher } from "@shared/database/schemas/publisher";
import type {
  MidweekAssignment,
  MidweekAssignmentId,
} from "@shared/database/schemas/midweek-assignment";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { participationTypeMap } from "./utils/participationTypeMap";
import { usePresets } from "./hooks/use-presets/usePresets";
import type { PublisherFilter, PublisherSortOrder } from "./hooks/use-presets/usePresets";
import { usePublisherStats } from "./hooks/use-publisher-stats/usePublisherStats";
import { usePublisherParticipationTypes } from "./hooks/use-publisher-participation-types/usePublisherParticipationTypes";
import { usePublisherSelection } from "./hooks/use-publisher-selection/usePublisherSelection";
import { getStoredCongregation } from "@util/app/congregation/utils";

interface PublisherSelectorProps {
  publishers: Publisher[];
  assignment: MidweekAssignment | undefined;
  assistantId: string | undefined;
  assistantAssignment: MidweekAssignment | undefined;
  onSelectAssignee: (publisher_id: string) => void;
  onSelectAssistant: (publisher_id: string) => void;
  onClearAssignee: () => void;
  onClearAssistant: () => void;
  assignment_id: string;
  week_id: string;
}

export function PublisherSelector({
  publishers,
  assignment,
  assistantId,
  assistantAssignment,
  onSelectAssignee,
  onSelectAssistant,
  onClearAssignee,
  onClearAssistant,
  assignment_id,
  week_id,
}: PublisherSelectorProps) {
  const congregation_id = getStoredCongregation()?.id;

  const participation_type = participationTypeMap[assignment_id as MidweekAssignmentId] ?? "prayer";
  const assistant_participation_type = assistantId
    ? (participationTypeMap[assistantId as MidweekAssignmentId] ?? "assistant")
    : null;

  const assignee_presets_api = usePresets(participation_type);
  const assistant_presets_api = usePresets(assistant_participation_type);

  const assignee_stats = usePublisherStats(
    participation_type,
    week_id,
    congregation_id,
    assignee_presets_api.active_preset.filter.stat_participation_types,
  );
  const assistant_stats = usePublisherStats(
    assistant_participation_type,
    week_id,
    congregation_id,
    assistant_presets_api.active_preset.filter.stat_participation_types,
  );
  const participation_types = usePublisherParticipationTypes(congregation_id);

  const { is_modal_open, selected_publisher, handleSelectPublisher, handleConfirm, handleDismiss } =
    usePublisherSelection({ publishers, onSelectAssignee, onSelectAssistant });

  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));
  const publisher_ids_with_week_assignment = new Set(
    ((allAssignments as MidweekAssignment[] | undefined) ?? [])
      .filter((a) => a.week_id === week_id)
      .map((a) => a.participant_id),
  );

  function handleAssigneeChange(filter: PublisherFilter, sort_order: PublisherSortOrder) {
    assignee_presets_api.updatePreset(filter, sort_order);
  }

  function handleAssistantChange(filter: PublisherFilter, sort_order: PublisherSortOrder) {
    assistant_presets_api.updatePreset(filter, sort_order);
  }

  if (!assistantId) {
    return (
      <>
        <PublisherControls
          presets={assignee_presets_api.presets}
          active_preset={assignee_presets_api.active_preset}
          is_default_active={assignee_presets_api.is_default_active}
          on_select_preset={assignee_presets_api.selectPreset}
          on_create_preset={assignee_presets_api.createPreset}
          on_rename_preset={assignee_presets_api.renamePreset}
          on_delete_preset={assignee_presets_api.deletePreset}
          on_change={handleAssigneeChange}
        />
        <Space size="sm" />
        <ClearAssignmentButton on_click={onClearAssignee} disabled={!assignment?.participant_id} />
        <PublisherList
          publishers={publishers}
          selected_id={assignment?.participant_id}
          on_select={(id) => handleSelectPublisher(id, "assignee")}
          sort_order={assignee_presets_api.active_preset.sort_order}
          stats={assignee_stats}
          filter={assignee_presets_api.active_preset.filter}
          participation_types={participation_types}
          publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
        />
        <PublisherSelectModal
          is_open={is_modal_open}
          publisher={selected_publisher}
          on_dismiss={handleDismiss}
          on_confirm={handleConfirm}
          week_id={week_id}
          all_assignments={(allAssignments as MidweekAssignment[] | undefined) ?? []}
          publishers={publishers}
        />
      </>
    );
  }

  return (
    <>
      <PublisherSegment
        publishers={publishers}
        assignment={assignment}
        assistantAssignment={assistantAssignment}
        assistant_label={assistantId === "cbs_reader" ? "Reader" : "Assistant"}
        assignee_preset={assignee_presets_api.active_preset}
        assistant_preset={assistant_presets_api.active_preset}
        assignee_presets={assignee_presets_api.presets}
        assistant_presets={assistant_presets_api.presets}
        assignee_is_default_active={assignee_presets_api.is_default_active}
        assistant_is_default_active={assistant_presets_api.is_default_active}
        assignee_stats={assignee_stats}
        assistant_stats={assistant_stats}
        participation_types={participation_types}
        onSelectAssigneePreset={assignee_presets_api.selectPreset}
        onCreateAssigneePreset={assignee_presets_api.createPreset}
        onRenameAssigneePreset={assignee_presets_api.renamePreset}
        onDeleteAssigneePreset={assignee_presets_api.deletePreset}
        onChangeAssignee={handleAssigneeChange}
        onSelectAssistantPreset={assistant_presets_api.selectPreset}
        onCreateAssistantPreset={assistant_presets_api.createPreset}
        onRenameAssistantPreset={assistant_presets_api.renamePreset}
        onDeleteAssistantPreset={assistant_presets_api.deletePreset}
        onChangeAssistant={handleAssistantChange}
        onSelectAssignee={(id) => handleSelectPublisher(id, "assignee")}
        onSelectAssistant={(id) => handleSelectPublisher(id, "assistant")}
        onClearAssignee={onClearAssignee}
        onClearAssistant={onClearAssistant}
        publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
      />
      <PublisherSelectModal
        is_open={is_modal_open}
        publisher={selected_publisher}
        on_dismiss={handleDismiss}
        on_confirm={handleConfirm}
        week_id={week_id}
        all_assignments={(allAssignments as MidweekAssignment[] | undefined) ?? []}
        publishers={publishers}
      />
    </>
  );
}
