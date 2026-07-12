import { Body } from "@ui/components/display/text/body/Body";
import { Select } from "@ui/components/inputs/select/Select";
import { Space } from "@ui/components/layout/space/Space";
import type {
  CleaningScheduleOption,
  CleaningWeek,
} from "../use-cleaning-schedules/useCleaningSchedules";

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
    <div
      style={{
        border: "1px solid var(--ion-color-light)",
        borderRadius: 8,
        padding: "1rem",
        background: "var(--ion-background-color)",
      }}
    >
      <Body size="md" bold>
        {week.week_label}
      </Body>
      <Space size="sm" />
      <Select
        label="Thorough cleaning"
        value={week.major_group_id ?? ""}
        options={group_options}
        disabled={!can_edit}
        on_change={(value) => {
          if (Array.isArray(value)) return;
          on_major_change(value ?? "");
        }}
      />
      <Space size="xs" />
      <Select
        label="Light cleaning"
        value={week.minor_group_id ?? ""}
        options={group_options}
        disabled={!can_edit}
        on_change={(value) => {
          if (Array.isArray(value)) return;
          on_minor_change(value ?? "");
        }}
      />
    </div>
  );
}
