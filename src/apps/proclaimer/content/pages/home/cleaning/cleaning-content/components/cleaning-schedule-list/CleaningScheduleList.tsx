import { Body } from "@ui/components/display/text/body/Body";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@ui/components/layout/space/Space";
import type {
  CleaningMonth,
  CleaningScheduleOption,
  CleaningWeek,
} from "../use-cleaning-schedules/useCleaningSchedules";
import { CleaningWeekCard } from "../cleaning-week-card/CleaningWeekCard";

interface CleaningScheduleListProps {
  months: CleaningMonth[];
  group_options: CleaningScheduleOption[];
  can_edit: boolean;
  on_major_change: (week_id: string, group_id: string) => void;
  on_minor_change: (week_id: string, group_id: string) => void;
}

export function CleaningScheduleList({
  months,
  group_options,
  can_edit,
  on_major_change,
  on_minor_change,
}: CleaningScheduleListProps) {
  if (months.length === 0) {
    return <Body>No cleaning weeks available.</Body>;
  }

  return (
    <>
      {months.map((month) => (
        <section key={month.label}>
          <Body size="xl" color="primary">
            {month.label.toUpperCase()}
          </Body>
          <Space size="sm" />
          <MultiColumnList<CleaningWeek>
            items={month.weeks}
            get_id={(week) => week.week_id}
            render_item={(week) => (
              <CleaningWeekCard
                week={week}
                group_options={group_options}
                can_edit={can_edit}
                on_major_change={(group_id) => on_major_change(week.week_id, group_id)}
                on_minor_change={(group_id) => on_minor_change(week.week_id, group_id)}
              />
            )}
            gap="sm"
            row_gap="sm"
          />
          <Space size="lg" />
        </section>
      ))}
    </>
  );
}
