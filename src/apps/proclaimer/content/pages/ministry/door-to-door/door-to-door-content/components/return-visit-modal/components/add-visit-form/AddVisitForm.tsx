import { useEffect, useRef, useState } from "react";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { TimeInput } from "@ui/components/inputs/time/TimeInput";
import { TextareaInput } from "@ui/components/inputs/textarea/TextareaInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { handleEditVisit } from "../../handlers/handleEditVisit";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import type { VisitLogEntry } from "@shared/database/schemas/return-visit";

type AddVisitFormProps = {
  onSave?: (visited_at: string, notes: string) => void;
  onCancel: () => void;
  initialVisit?: VisitLogEntry;
  returnVisitId?: string;
  onError?: (message: string) => void;
  onDelete?: () => void;
};

export function AddVisitForm({
  onSave,
  onCancel,
  initialVisit,
  returnVisitId,
  onError,
  onDelete,
}: AddVisitFormProps) {
  const isEditing = !!initialVisit && !!returnVisitId;
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
  const notesDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestRef = useRef({ date, time, notes });
  latestRef.current = { date, time, notes };

  useEffect(() => {
    return () => {
      if (notesDebounceRef.current) clearTimeout(notesDebounceRef.current);
    };
  }, []);

  function persistEdit(nextDate: string, nextTime: string, nextNotes: string) {
    if (!isEditing || !returnVisitId || !initialVisit) return;
    try {
      const visited_at = new Date(`${nextDate}T${nextTime}`).toISOString();
      handleEditVisit(returnVisitId, initialVisit.id, { visited_at, notes: nextNotes.trim() });
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Failed to save visit");
    }
  }

  function handleDateChange(value: string) {
    setDate(value);
    persistEdit(value, time, notes);
  }

  function handleTimeChange(value: string) {
    setTime(value);
    persistEdit(date, value, notes);
  }

  function handleNotesChange(value: string) {
    setNotes(value);
    if (notesDebounceRef.current) clearTimeout(notesDebounceRef.current);
    notesDebounceRef.current = setTimeout(() => {
      const { date, time, notes } = latestRef.current;
      persistEdit(date, time, notes);
    }, 500);
  }

  function handleDeleteVisit() {
    if (!isEditing || !returnVisitId || !initialVisit) return;
    try {
      returnVisitCollection.update(returnVisitId, (draft) => {
        draft.visit_log = draft.visit_log.filter((v) => v.id !== initialVisit.id);
      });
      onDelete?.();
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Failed to delete visit");
    }
  }

  function handleSave() {
    const visited_at = new Date(`${date}T${time}`).toISOString();
    onSave?.(visited_at, notes.trim());
  }

  return (
    <>
      <DateInput label="Date" value={date} on_change={handleDateChange} />
      <TimeInput label="Time" value={time} on_change={handleTimeChange} />
      <TextareaInput
        label="Notes"
        value={notes}
        placeholder="Visit notes..."
        on_change={handleNotesChange}
      />
      <Space />
      <TextButton label={isEditing ? "Close" : "Cancel"} fill="clear" on_click={onCancel} />
      <Space />
      {!isEditing && <SaveTextButton on_click={handleSave} />}
      {isEditing && (
        <TextButton label="Delete Visit" color="danger" fill="clear" on_click={handleDeleteVisit} />
      )}
    </>
  );
}
