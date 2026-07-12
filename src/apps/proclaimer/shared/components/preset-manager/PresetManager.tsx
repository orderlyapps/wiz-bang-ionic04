import { useState } from "react";
import { IonAlert, IonItem, IonList, IonNote } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";

interface PresetLike {
  id: string;
  name: string;
}

interface PresetManagerProps<T extends PresetLike> {
  presets: T[];
  active_preset_id: string;
  is_default_active: boolean;
  default_preset_ids: Set<string>;
  on_select: (id: string) => void;
  on_create: (name: string) => void;
  on_rename: (id: string, name: string) => void;
  on_delete: (id: string) => void;
  show_note?: boolean;
}

export function PresetManager<T extends PresetLike>({
  presets,
  active_preset_id,
  is_default_active,
  default_preset_ids,
  on_select,
  on_create,
  on_rename,
  on_delete,
  show_note = true,
}: PresetManagerProps<T>) {
  const [show_save_alert, set_show_save_alert] = useState(false);
  const [show_rename_alert, set_show_rename_alert] = useState(false);

  const preset_options = [...presets]
    .sort((a, b) => {
      const a_is_default = default_preset_ids.has(a.id);
      const b_is_default = default_preset_ids.has(b.id);
      if (a_is_default !== b_is_default) return a_is_default ? 1 : -1;
      return 0;
    })
    .map((p) => ({ label: p.name, value: p.id }));
  const active_preset_name = presets.find((p) => p.id === active_preset_id)?.name ?? "";
  const has_custom_presets = presets.some((p) => !default_preset_ids.has(p.id));

  const row_items = [
    {
      id: "select",
      node: (
        <Select
          key={`${active_preset_id}:${active_preset_name}`}
          label="Preset"
          value={active_preset_id}
          options={preset_options}
          interface_type="popover"
          on_change={(id) => on_select(id as string)}
        />
      ),
    },
    {
      id: "actions",
      node: (
        <div className="flex-left" style={{ padding: "8px 16px" }}>
          <TextButton
            label="Duplicate"
            fill="clear"
            size="small"
            on_click={() => set_show_save_alert(true)}
          />
          {!is_default_active && (
            <TextButton
              label="Rename"
              fill="clear"
              size="small"
              on_click={() => set_show_rename_alert(true)}
            />
          )}
          {!is_default_active && (
            <DeleteTextButton
              label="Delete"
              fill="clear"
              size="small"
              alert_header="Delete preset"
              alert_message="Are you sure you want to delete this preset?"
              on_click={() => on_delete(active_preset_id)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <IonList>
      <MultiColumnList
        items={row_items}
        get_id={(item) => item.id}
        render_item={(item) => item.node}
        gap="sm"
        column_offset={-1}
      />

      {show_note && !has_custom_presets && (
        <IonItem lines="none">
          <IonNote>
            NOTE: Save the current filters as a preset using the Duplicate button above.
          </IonNote>
        </IonItem>
      )}

      <IonAlert
        isOpen={show_save_alert}
        header="Save preset"
        inputs={[{ name: "name", type: "text", placeholder: "Preset name" }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: { name: string }) => {
              if (data.name?.trim()) on_create(data.name.trim());
              set_show_save_alert(false);
            },
          },
        ]}
        onDidDismiss={() => set_show_save_alert(false)}
      />

      <IonAlert
        isOpen={show_rename_alert}
        header="Rename preset"
        inputs={[
          {
            name: "name",
            type: "text",
            placeholder: "New name",
            value:
              presets.find((p) => p.id === active_preset_id && !default_preset_ids.has(p.id))
                ?.name ?? "",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Rename",
            handler: (data: { name: string }) => {
              if (data.name?.trim()) on_rename(active_preset_id, data.name.trim());
              set_show_rename_alert(false);
            },
          },
        ]}
        onDidDismiss={() => set_show_rename_alert(false)}
      />
    </IonList>
  );
}
