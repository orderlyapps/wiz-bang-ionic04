import { TextInput } from "@ui/components/inputs/text/TextInput";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import type { EventFormFieldProps } from "../../types";

export function SpecialTalkForm(props: EventFormFieldProps) {
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
      <DateInput
        label="Date"
        value={props.start_date}
        on_change={(v) => on_change("start_date", v)}
      />
      <TextInput
        label="Start Time"
        value={props.start_time}
        placeholder="HH:MM"
        on_change={(v) => on_change("start_time", v)}
      />
    </>
  );
}
