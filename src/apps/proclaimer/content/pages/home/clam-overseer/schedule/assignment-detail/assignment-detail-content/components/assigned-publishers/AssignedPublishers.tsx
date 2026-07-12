import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface AssignmentItem {
  id: string;
  label: string;
  value: string;
  on_delete: () => void;
}

interface AssignedPublishersProps {
  assignee: Publisher | undefined;
  assigneeLabel: string;
  onDeleteAssignee: () => void;
  assistantId: string | undefined;
  assistantAssignee: Publisher | undefined;
  onDeleteAssistant: () => void;
}

export function AssignedPublishers({
  assignee,
  assigneeLabel,
  onDeleteAssignee,
  assistantId,
  assistantAssignee,
  onDeleteAssistant,
}: AssignedPublishersProps) {
  const items: AssignmentItem[] = [
    ...(assignee
      ? [
          {
            id: "assignee",
            label: assigneeLabel,
            value: getPublisherDisplayName(assignee),
            on_delete: onDeleteAssignee,
          },
        ]
      : []),
    ...(assistantId && assistantAssignee
      ? [
          {
            id: "assistant",
            label: assistantId === "cbs_reader" ? "Reader" : "Assistant",
            value: getPublisherDisplayName(assistantAssignee),
            on_delete: onDeleteAssistant,
          },
        ]
      : []),
  ];

  return (
    <MultiColumnList
      items={items}
      get_id={(item) => item.id}
      render_item={(item) => (
        <LabelValueItem
          label={item.label}
          value={item.value}
          end_detail={
            <DeleteIconButton
              alert_header="Remove Assignment"
              alert_message="Remove this publisher from the assignment?"
              confirm_text="Remove"
              on_click={item.on_delete}
            />
          }
        />
      )}
    />
  );
}
