import type { Publisher } from "@shared/database/schemas/publisher";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { PublisherNameInput } from "@proclaimer-shared/publisher/components/publisher-name-input/PublisherNameInput";
import { Select } from "@ui/components/inputs/select/Select";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const TYPE_OPTIONS = [
  { label: "Publisher", value: "publisher" },
  { label: "Continuous Auxiliary", value: "continuous_auxiliary" },
  { label: "Special Pioneer", value: "special_pioneer" },
  { label: "Regular Pioneer", value: "regular_pioneer" },
  { label: "Circuit Overseer", value: "circuit_overseer" },
  { label: "Inactive", value: "inactive" },
  { label: "Associate", value: "associate" },
];

const STANDING_OPTIONS = [
  { label: "Publisher", value: "publisher" },
  { label: "Unbaptised Publisher", value: "unbaptised_publisher" },
  { label: "Ministerial Servant", value: "ministerial_servant" },
  { label: "Elder", value: "elder" },
  { label: "Associate", value: "associate" },
];

function optionLabel(options: { label: string; value: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

interface Props {
  publisher_id: string;
  publisher: Publisher & { id?: string };
  read_only?: boolean;
}

export function PublisherPublicSection({ publisher_id, publisher, read_only = false }: Props) {
  const name_value = {
    first_name: publisher.first_name,
    middle_name: publisher.middle_name ?? null,
    last_name: publisher.last_name,
    display_name: publisher.display_name ?? null,
  };

  if (read_only) {
    return (
      <>
        <LabelValueItem label="Name" value={getPublisherDisplayName(name_value, "complete")} />
        <LabelValueItem label="Gender" value={optionLabel(GENDER_OPTIONS, publisher.gender)} />
        <LabelValueItem label="Ministry Type" value={optionLabel(TYPE_OPTIONS, publisher.type)} />
        <LabelValueItem
          label="Standing"
          value={optionLabel(STANDING_OPTIONS, publisher.standing)}
        />
        {publisher.archived_at && (
          <LabelValueItem
            label="Archived"
            value={new Date(publisher.archived_at).toLocaleDateString()}
          />
        )}
      </>
    );
  }

  return (
    <>
      <PublisherNameInput publisher_id={publisher_id} value={name_value} />
      <Select
        label="Gender"
        value={publisher.gender}
        options={GENDER_OPTIONS}
        on_change={(value) => {
          if (!value || Array.isArray(value)) return;
          publisherCollection.update(publisher_id, (draft) => {
            draft.gender = value as typeof publisher.gender;
          });
        }}
      />
      <Select
        label="Ministry Type"
        value={publisher.type}
        options={TYPE_OPTIONS}
        on_change={(value) => {
          if (!value || Array.isArray(value)) return;
          publisherCollection.update(publisher_id, (draft) => {
            draft.type = value as typeof publisher.type;
          });
        }}
      />
      <Select
        label="Standing"
        value={publisher.standing}
        options={STANDING_OPTIONS}
        on_change={(value) => {
          if (!value || Array.isArray(value)) return;
          publisherCollection.update(publisher_id, (draft) => {
            draft.standing = value as typeof publisher.standing;
          });
        }}
      />
    </>
  );
}
