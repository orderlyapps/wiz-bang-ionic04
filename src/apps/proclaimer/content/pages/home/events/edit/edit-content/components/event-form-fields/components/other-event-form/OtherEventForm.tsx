import { TextInput } from "@ui/components/inputs/text/TextInput";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import type { EventFormFieldProps } from "../../types";

export function OtherEventForm(props: EventFormFieldProps) {
  const { on_change } = props;
  return (
    <>
      <TextInput label="Name" value={props.name} on_change={(v) => on_change("name", v)} />
      <TextInput
        label="Description"
        value={props.description}
        on_change={(v) => on_change("description", v)}
      />
      <TextInput label="Address" value={props.address} on_change={(v) => on_change("address", v)} />
      <ToggleInput
        label="All Day"
        checked={props.all_day}
        on_change={(v) => on_change("all_day", v)}
      />
      <DateInput
        label="Start Date"
        value={props.start_date}
        on_change={(v) => on_change("start_date", v)}
      />
      {!props.all_day && (
        <TextInput
          label="Start Time"
          value={props.start_time}
          placeholder="HH:MM"
          on_change={(v) => on_change("start_time", v)}
        />
      )}
      <DateInput
        label="End Date"
        value={props.end_date}
        on_change={(v) => on_change("end_date", v)}
      />
      {!props.all_day && (
        <TextInput
          label="End Time"
          value={props.end_time}
          placeholder="HH:MM"
          on_change={(v) => on_change("end_time", v)}
        />
      )}
    </>
  );
}
