import {
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonLabel,
  IonItemDivider,
} from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import { PublisherList } from "../../../publisher-list/PublisherList";
import { PublisherControls } from "../publisher-controls/PublisherControls";
import { ClearAssignmentButton } from "../clear-assignment-button/ClearAssignmentButton";
import { Space } from "@ui/components/layout/space/Space";
import type { PublisherStats } from "../../hooks/use-publisher-stats/usePublisherStats";
import type {
  FilterSortPreset,
  PublisherFilter,
  PublisherSortOrder,
} from "../../hooks/use-presets/usePresets";
import type { ParticipationType } from "../../utils/participationTypeMap";

interface PublisherSegmentProps {
  publishers: Publisher[];
  assignment: MidweekAssignment | undefined;
  assistantAssignment: MidweekAssignment | undefined;
  assistant_label: string;
  assignee_preset: FilterSortPreset;
  assistant_preset: FilterSortPreset;
  assignee_presets: FilterSortPreset[];
  assistant_presets: FilterSortPreset[];
  assignee_is_default_active: boolean;
  assistant_is_default_active: boolean;
  assignee_stats: Map<string, PublisherStats>;
  assistant_stats: Map<string, PublisherStats>;
  participation_types: Map<string, Set<ParticipationType>>;
  onSelectAssigneePreset: (id: string) => void;
  onCreateAssigneePreset: (name: string) => void;
  onRenameAssigneePreset: (id: string, name: string) => void;
  onDeleteAssigneePreset: (id: string) => void;
  onChangeAssignee: (filter: PublisherFilter, sort_order: PublisherSortOrder) => void;
  onSelectAssistantPreset: (id: string) => void;
  onCreateAssistantPreset: (name: string) => void;
  onRenameAssistantPreset: (id: string, name: string) => void;
  onDeleteAssistantPreset: (id: string) => void;
  onChangeAssistant: (filter: PublisherFilter, sort_order: PublisherSortOrder) => void;
  onSelectAssignee: (id: string) => void;
  onSelectAssistant: (id: string) => void;
  onClearAssignee: () => void;
  onClearAssistant: () => void;
  publisher_ids_with_week_assignment?: Set<string>;
}

export function PublisherSegment({
  publishers,
  assignment,
  assistantAssignment,
  assistant_label,
  assignee_preset,
  assistant_preset,
  assignee_presets,
  assistant_presets,
  assignee_is_default_active,
  assistant_is_default_active,
  assignee_stats,
  assistant_stats,
  participation_types,
  onSelectAssigneePreset,
  onCreateAssigneePreset,
  onRenameAssigneePreset,
  onDeleteAssigneePreset,
  onChangeAssignee,
  onSelectAssistantPreset,
  onCreateAssistantPreset,
  onRenameAssistantPreset,
  onDeleteAssistantPreset,
  onChangeAssistant,
  onSelectAssignee,
  onSelectAssistant,
  onClearAssignee,
  onClearAssistant,
  publisher_ids_with_week_assignment,
}: PublisherSegmentProps) {
  return (
    <>
      <IonItemDivider sticky style={{ paddingBlock: "1rem" }}>
        <IonSegment value="assignee">
          <IonSegmentButton value="assignee" contentId="assignee">
            <IonLabel>Assignee</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="assistant" contentId="assistant">
            <IonLabel>{assistant_label}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonItemDivider>
      <IonSegmentView>
        <IonSegmentContent id="assignee">
          <PublisherControls
            presets={assignee_presets}
            active_preset={assignee_preset}
            is_default_active={assignee_is_default_active}
            on_select_preset={onSelectAssigneePreset}
            on_create_preset={onCreateAssigneePreset}
            on_rename_preset={onRenameAssigneePreset}
            on_delete_preset={onDeleteAssigneePreset}
            on_change={onChangeAssignee}
          />
          <Space size="sm" />
          <ClearAssignmentButton
            on_click={onClearAssignee}
            disabled={!assignment?.participant_id}
          />
          <PublisherList
            publishers={publishers}
            selected_id={assignment?.participant_id}
            on_select={onSelectAssignee}
            sort_order={assignee_preset.sort_order}
            stats={assignee_stats}
            filter={assignee_preset.filter}
            participation_types={participation_types}
            publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
          />
        </IonSegmentContent>
        <IonSegmentContent id="assistant">
          <PublisherControls
            presets={assistant_presets}
            active_preset={assistant_preset}
            is_default_active={assistant_is_default_active}
            on_select_preset={onSelectAssistantPreset}
            on_create_preset={onCreateAssistantPreset}
            on_rename_preset={onRenameAssistantPreset}
            on_delete_preset={onDeleteAssistantPreset}
            on_change={onChangeAssistant}
          />
          <Space size="sm" />
          <ClearAssignmentButton
            label={`Clear ${assistant_label}`}
            on_click={onClearAssistant}
            disabled={!assistantAssignment?.participant_id}
          />
          <PublisherList
            publishers={publishers}
            selected_id={assistantAssignment?.participant_id}
            on_select={onSelectAssistant}
            sort_order={assistant_preset.sort_order}
            stats={assistant_stats}
            filter={assistant_preset.filter}
            participation_types={participation_types}
            publisher_ids_with_week_assignment={publisher_ids_with_week_assignment}
          />
        </IonSegmentContent>
      </IonSegmentView>
    </>
  );
}
