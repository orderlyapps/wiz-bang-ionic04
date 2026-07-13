import { useState } from "react";
import { IonList } from "@ionic/react";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@ui/components/layout/space/Space";

interface TimeEntryFormProps {
  on_add: (date: string, start_time: string, end_time: string, note: string) => void;
}

function todayISO(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function TimeEntryForm({ on_add }: TimeEntryFormProps) {
  const [date, set_date] = useState(todayISO());
  const [start_time, set_start_time] = useState("");
  const [end_time, set_end_time] = useState("");
  const [note, set_note] = useState("");

  function handleSubmit() {
    on_add(date, start_time, end_time, note.trim());
    set_note("");
  }

  return (
    <IonList>
      <DateInput label="Date" value={date} on_change={set_date} />
      <TimeInput label="Start" value={start_time} on_change={set_start_time} />
      <TimeInput label="Finish" value={end_time} on_change={set_end_time} />
      <TextInput label="Note" placeholder="Optional" value={note} on_change={set_note} />
      <Space size="lg" />
      <SaveTextButton label="Add Entry" variant="save" skip_confirmation on_click={handleSubmit} />
      <Space size="lg" />
    </IonList>
  );
}
