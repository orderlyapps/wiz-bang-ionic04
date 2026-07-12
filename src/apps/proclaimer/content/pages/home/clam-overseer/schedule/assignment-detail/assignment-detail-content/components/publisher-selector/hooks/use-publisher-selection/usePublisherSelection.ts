import { useState } from "react";
import type { Publisher } from "@shared/database/schemas/publisher";

type SelectionMode = "assignee" | "assistant";

interface UsePublisherSelectionProps {
  publishers: Publisher[];
  onSelectAssignee: (publisher_id: string) => void;
  onSelectAssistant: (publisher_id: string) => void;
}

export function usePublisherSelection({
  publishers,
  onSelectAssignee,
  onSelectAssistant,
}: UsePublisherSelectionProps) {
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [selected_publisher, set_selected_publisher] = useState<Publisher | undefined>();
  const [selection_mode, set_selection_mode] = useState<SelectionMode>("assignee");

  function handleSelectPublisher(publisher_id: string, mode: SelectionMode) {
    const publisher = publishers.find((p) => p.id === publisher_id);
    set_selected_publisher(publisher);
    set_selection_mode(mode);
    set_is_modal_open(true);
  }

  function handleConfirm() {
    if (!selected_publisher?.id) return;
    if (selection_mode === "assignee") {
      onSelectAssignee(selected_publisher.id);
    } else {
      onSelectAssistant(selected_publisher.id);
    }
  }

  function handleDismiss() {
    set_is_modal_open(false);
  }

  return {
    is_modal_open,
    selected_publisher,
    handleSelectPublisher,
    handleConfirm,
    handleDismiss,
  };
}
