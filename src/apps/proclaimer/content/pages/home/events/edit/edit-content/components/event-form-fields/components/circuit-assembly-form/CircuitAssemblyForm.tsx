import { Select } from "@ui/components/inputs/select/Select";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import type { EventFormFieldProps } from "../../types";

const DESCRIPTION_OPTIONS = [
  { label: "with Circuit Overseer", value: "with Circuit Overseer" },
  { label: "with Branch Representative", value: "with Branch Representative" },
];

export function CircuitAssemblyForm(props: EventFormFieldProps) {
  const { on_change } = props;
  return (
    <>
      <Select
        label="With"
        value={props.description}
        options={DESCRIPTION_OPTIONS}
        placeholder="Select a description"
        on_change={(v) => on_change("description", v as string)}
        interface_type="popover"
      />
      <TextInput
        label="Theme"
        value={props.name || "TBC"}
        placeholder="TBC"
        on_change={(v) => on_change("name", v)}
      />
      <DateInput
        label="Date"
        value={props.start_date}
        on_change={(v) => on_change("start_date", v)}
      />
    </>
  );
}
