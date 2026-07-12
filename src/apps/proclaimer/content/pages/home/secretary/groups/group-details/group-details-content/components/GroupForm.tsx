import { IonList } from "@ionic/react";
import { groupCollection } from "@shared/database/collections/group";
import type { Publisher } from "@shared/database/schemas/publisher";
import { AlertTextInput } from "@ui/components/inputs/alert-text/AlertTextInput";
import { Select } from "@ui/components/inputs/select/Select";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

interface GroupFormProps {
  group_id: string;
  name: string;
  overseer_id: string | null | undefined;
  assistant_id: string | null | undefined;
  publishers: Publisher[];
}

export function GroupForm({
  group_id,
  name,
  overseer_id,
  assistant_id,
  publishers,
}: GroupFormProps) {
  const member_options = [
    { label: "None", value: "" },
    ...publishers.map((p) => ({ label: getPublisherDisplayName(p), value: p.id ?? "" })),
  ];

  type FormField = { id: "name" } | { id: "overseer" } | { id: "assistant" };

  const fields: FormField[] = [{ id: "name" }, { id: "overseer" }, { id: "assistant" }];

  return (
    <IonList>
      <MultiColumnList
        items={fields}
        get_id={(f) => f.id}
        render_item={(f) => {
          if (f.id === "name") {
            return (
              <AlertTextInput
                label="Name"
                value={name}
                on_change={(value) => {
                  groupCollection.update(group_id, (draft) => {
                    draft.name = value;
                  });
                }}
              />
            );
          }
          if (f.id === "overseer") {
            return (
              <Select
                label="Overseer"
                value={overseer_id ?? ""}
                options={member_options}
                on_change={(value) => {
                  if (Array.isArray(value)) return;
                  groupCollection.update(group_id, (draft) => {
                    draft.overseer_id = value || null;
                  });
                }}
              />
            );
          }
          return (
            <Select
              label="Assistant"
              value={assistant_id ?? ""}
              options={member_options}
              on_change={(value) => {
                if (Array.isArray(value)) return;
                groupCollection.update(group_id, (draft) => {
                  draft.assistant_id = value || null;
                });
              }}
            />
          );
        }}
      />
    </IonList>
  );
}
