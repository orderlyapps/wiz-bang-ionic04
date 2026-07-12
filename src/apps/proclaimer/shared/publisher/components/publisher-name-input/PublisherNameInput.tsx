import { NameInput } from "@ui/components/inputs/name/NameInput";
import type { NameValue } from "@ui/components/inputs/name/NameInput";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

interface PublisherNameInputProps {
  value: NameValue;
  publisher_id?: string;
  disabled?: boolean;
  on_change?: (value: NameValue) => void;
}

export function PublisherNameInput({
  value,
  publisher_id,
  on_change,
  disabled,
}: PublisherNameInputProps) {
  const display_value = getPublisherDisplayName(value, "complete");

  function handleChange(data: NameValue) {
    if (publisher_id) {
      publisherCollection.update(publisher_id, (draft) => {
        draft.first_name = data.first_name;
        draft.middle_name = data.middle_name;
        draft.last_name = data.last_name;
        draft.display_name = data.display_name;
      });
    }
    on_change?.(data);
  }

  return (
    <NameInput
      label="Name"
      value={value}
      display_value={display_value}
      disabled={disabled}
      on_change={handleChange}
    />
  );
}
