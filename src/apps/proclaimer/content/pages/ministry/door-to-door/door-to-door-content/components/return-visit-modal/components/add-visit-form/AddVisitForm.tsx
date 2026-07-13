import { useState } from "react";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import type { VisitLogEntry } from "@shared/database/schemas/return-visit";

type AddVisitFormProps = {
  onSave: (visited_at: string, notes: string) => void;
  onCancel: () => void;
  initialVisit?: VisitLogEntry;
};

export function AddVisitForm({ onSave, onCancel, initialVisit }: AddVisitFormProps) {
  const initialDate = initialVisit
    ? initialVisit.visited_at.substring(0, 10)
    : new Date().toISOString().substring(0, 10);
  const initialTime = initialVisit
    ? new Date(initialVisit.visited_at).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [notes, setNotes] = useState(initialVisit?.notes ?? "");

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
