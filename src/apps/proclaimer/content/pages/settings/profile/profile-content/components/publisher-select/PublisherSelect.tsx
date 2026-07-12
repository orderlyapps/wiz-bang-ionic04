import { useState } from "react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { PublisherSelectModal } from "./publisher-select-modal/PublisherSelectModal";
import {
  getStoredPublisher,
  getPublisherDisplayName,
} from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PublisherSelectProps {
  on_change: (publisher: Publisher | null) => void;
}

export function PublisherSelect({ on_change }: PublisherSelectProps) {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [publisher, setPublisher] = useState(getStoredPublisher);

  const handleSelect = () => {
    const p = getStoredPublisher();
    setPublisher(p);
    on_change(p);
  };

  return (
    <>
      {publisher ? (
        <LabelValueItem label="Personalised for" value={getPublisherDisplayName(publisher)} />
      ) : (
        <ModalSelect
          label="Publisher"
          display_value=""
          placeholder="Select publisher..."
          on_open={() => setShowSelectModal(true)}
        />
      )}
      <PublisherSelectModal
        isOpen={showSelectModal}
        onDismiss={() => setShowSelectModal(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
