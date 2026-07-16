import type { ReactNode } from "react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import type {
  CleaningScheduleOption,
  CleaningWeek,
} from "../use-cleaning-schedules/useCleaningSchedules";
import { IonItem, IonLabel } from "@ionic/react";
import { Label } from "@ui/components/display/text/label/Label";
import { Space } from "@ui/components/layout/space/Space";

interface CleaningWeekCardProps {
  week: CleaningWeek;
  group_options: CleaningScheduleOption[];
  can_edit: boolean;
  on_major_change: (group_id: string) => void;
  on_minor_change: (group_id: string) => void;
}

export function CleaningWeekCard({
  week,
  group_options,
  can_edit,
  on_major_change,
  on_minor_change,
}: CleaningWeekCardProps) {
  return (
    <>
      <MultiColumnList<{ key: string; node: ReactNode }>
        items={[
          {
            key: "heading",
            node: (
              <IonItem lines="none">
                <IonLabel>
                  <Label color="medium">{week.week_label}</Label>
                </IonLabel>
              </IonItem>
            ),
          },
          {
            key: "major",
            node: (
              <Select
                label="Thorough Clean"
                value={week.major_group_id ?? ""}
                options={group_options}
                disabled={!can_edit}
                on_change={(value) => {
                  if (Array.isArray(value)) return;
                  on_major_change(value ?? "");
                }}
              />
            ),
          },
          {
            key: "minor",
            node: (
              <Select
                label="Light Clean"
                value={week.minor_group_id ?? ""}
                options={group_options}
                disabled={!can_edit}
                on_change={(value) => {
                  if (Array.isArray(value)) return;
                  on_minor_change(value ?? "");
                }}
              />
            ),
          },
        ]}
        get_id={(item) => item.key}
        render_item={(item) => item.node}
        gap="sm"
        max_columns={2}
        pin_to_first_column={(item) => item.key === "major"}
      />
      <Space />
    </>
  );
}
