import { TextInput } from "@ui/components/inputs/text/TextInput";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import type { EventFormFieldProps } from "../../types";

export function ConventionForm(props: EventFormFieldProps) {
  const { on_change } = props;
  return (
    <>
      <TextInput label="Name" value={props.name} on_change={(v) => on_change("name", v)} />
      <TextInput label="Address" value={props.address} on_change={(v) => on_change("address", v)} />
      <DateInput
        label="Start Date"
        value={props.start_date}
        on_change={(v) => on_change("start_date", v)}
      />
      <DateInput
        label="End Date"
        value={props.end_date}
        on_change={(v) => on_change("end_date", v)}
      />
    </>
  );
}
