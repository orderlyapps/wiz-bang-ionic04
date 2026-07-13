import { useState } from "react";
import { IonItem, IonList } from "@ionic/react";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import { Select } from "@ui/components/inputs/select/Select";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";
import { MINISTRY_TYPES, type MinistryType } from "@shared/database/rxdb/collections/ministry-time";

const MINISTRY_TYPE_OPTIONS = MINISTRY_TYPES.map((value) => ({
  value,
  label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
}));

interface TimeEntryFormInitialValues {
  date: string;
  start_time: string;
  end_time: string;
  ministry_type: MinistryType;
  note: string;
}

interface TimeEntryFormProps {
  on_add: (
    date: string,
    start_time: string,
    end_time: string,
    ministry_type: MinistryType,
    note: string,
  ) => void;
  initial_values?: TimeEntryFormInitialValues;
}

function todayISO(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function TimeEntryForm({ on_add, initial_values }: TimeEntryFormProps) {
  const [date, set_date] = useState(initial_values?.date ?? todayISO());
  const [start_time, set_start_time] = useState(initial_values?.start_time ?? "");
  const [end_time, set_end_time] = useState(initial_values?.end_time ?? "");
  const [ministry_type, set_ministry_type] = useState<MinistryType>(
    initial_values?.ministry_type ?? "door_to_door",
  );
  const [note, set_note] = useState(initial_values?.note ?? "");

  const time_error =
    start_time && end_time && end_time < start_time
      ? "Finish time cannot be before start time"
      : null;

  function handleSubmit() {
    if (time_error) return;
    on_add(date, start_time, end_time, ministry_type, note.trim());
    set_note("");
  }

  return (
    <IonList>
      <DateInput label="Date" value={date} on_change={set_date} />
      <TimeInput label="Start" value={start_time} on_change={set_start_time} />
      <TimeInput label="Finish" value={end_time} on_change={set_end_time} />
      {time_error && (
        <IonItem lines="none">
          <Body color="danger" size="sm">
            {time_error}
          </Body>
        </IonItem>
      )}
      <Select
        label="Ministry Type"
        value={ministry_type}
        options={MINISTRY_TYPE_OPTIONS}
        on_change={(v) => set_ministry_type(v as MinistryType)}
        interface_type="popover"
      />
      <TextareaInput label="Note" placeholder="Optional" value={note} on_change={set_note} />
      <Space size="lg" />
      <SaveTextButton
        label={initial_values ? "Update Entry" : "Add Entry"}
        variant="save"
        skip_confirmation
        disabled={!!time_error}
        on_click={handleSubmit}
      />
      <Space size="lg" />
    </IonList>
  );
}
