import { addWeeks } from "date-fns/addWeeks";
import { addMonths } from "date-fns/addMonths";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";
import { Select } from "@ui/components/inputs/select/Select";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { getWeekStart } from "@proclaimer-shared/util/date/getWeekStart";

interface WeekSelectProps {
  label?: string;
  value: string;
  months_ahead?: number;
  disabled?: boolean;
  on_change: (week_start: string) => void;
}

export function WeekSelect({
  label = "Week",
  value,
  months_ahead = 6,
  disabled = false,
  on_change,
}: WeekSelectProps) {
  const first_week = getWeekStart(new Date());
  const last_week = getWeekStart(addMonths(new Date(), months_ahead));

  const week_starts: string[] = [];
  for (
    let week = first_week;
    week <= last_week;
    week = format(addWeeks(parseISO(week), 1), "yyyy-MM-dd")
  ) {
    week_starts.push(week);
  }

  // Keep an already selected week (e.g. a past event) selectable.
  if (value && !week_starts.includes(value)) {
    week_starts.unshift(value);
  }

  const options = week_starts.map((week_start) => ({
    label: getTheocraticWeekLabel(week_start, {
      format: "week-range-capital-case",
      useRelativeWeek: true,
      relativeWeekStyle: "append",
    }),
    value: week_start,
  }));

  return (
    <Select
      label={label}
      value={value || null}
      options={options}
      placeholder="Select a week"
      disabled={disabled}
      interface_type="popover"
      on_change={(v) => on_change((v as string) ?? "")}
    />
  );
}
