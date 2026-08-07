import { addDays } from "date-fns/addDays";
import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { WeekSelect } from "@proclaimer-shared/components/inputs/week-select/WeekSelect";
import type { EventFormFieldProps } from "../../types";

export function CircuitVisitForm(props: EventFormFieldProps) {
  const { on_change, on_details_change, details } = props;

  function handleWeekChange(week_start: string) {
    on_change("start_date", week_start);
    on_change("end_date", week_start ? format(addDays(parseISO(week_start), 6), "yyyy-MM-dd") : "");
  }

  return (
    <>
      <TextInput label="Name" value={props.name} on_change={(v) => on_change("name", v)} />
      <TextInput label="Address" value={props.address} on_change={(v) => on_change("address", v)} />
      <WeekSelect value={props.start_date} on_change={handleWeekChange} />
      <TextInput
        label="Midweek Theme"
        value={details.midweek_theme}
        on_change={(v) => on_details_change("midweek_theme", v)}
      />
      <TextInput
        label="Weekend Theme"
        value={details.weekend_theme}
        on_change={(v) => on_details_change("weekend_theme", v)}
      />
      <TimeInput
        label="Pioneer Meeting Time"
        value={details.pioneer_meeting_time}
        on_change={(v) => on_details_change("pioneer_meeting_time", v)}
      />
    </>
  );
}
