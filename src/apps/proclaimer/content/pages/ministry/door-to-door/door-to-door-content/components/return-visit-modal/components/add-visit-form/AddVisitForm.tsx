import { useState } from "react";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";

type AddVisitFormProps = {
  onSave: (visited_at: string, notes: string) => void;
  onCancel: () => void;
};

export function AddVisitForm({ onSave, onCancel }: AddVisitFormProps) {
  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
  );
  const [notes, setNotes] = useState("");

  function handleSave() {
    const visited_at = new Date(`${date}T${time}`).toISOString();
    onSave(visited_at, notes.trim());
  }

  return (
    <>
      <DateInput label="Date" value={date} on_change={setDate} />
      <TimeInput label="Time" value={time} on_change={setTime} />
      <TextareaInput
        label="Notes"
        value={notes}
        placeholder="Visit notes..."
        on_change={setNotes}
      />
      <Space />
      <SaveTextButton on_click={handleSave} />
      <Space />
      <TextButton label="Cancel" fill="clear" on_click={onCancel} />
    </>
  );
}
