import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Space } from "@ui/components/layout/space/Space";
import { CleaningScheduleList } from "./components/cleaning-schedule-list/CleaningScheduleList";
import { useCleaningSchedules } from "./components/use-cleaning-schedules/useCleaningSchedules";

export function CleaningContent() {
  const { months, group_options, is_loading, can_edit, on_major_change, on_minor_change } =
    useCleaningSchedules();

  if (is_loading) {
    return <Spinner className="flex-center" />;
  }

  return (
    <>
      <CleaningScheduleList
        months={months}
        group_options={group_options}
        can_edit={can_edit}
        on_major_change={on_major_change}
        on_minor_change={on_minor_change}
      />
      <Space size="lg" />
    </>
  );
}
