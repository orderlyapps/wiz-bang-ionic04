import { useLiveQuery } from "@tanstack/react-db";
import { ministryTimeLocalCollection } from "@shared/database/collections/ministry-time-local";
import type {
  MinistryTimeLocal,
  MinistryType,
} from "@shared/database/rxdb/collections/ministry-time";

export type MinistryTimeEntry = MinistryTimeLocal;

function computeMinutes(start_time: string, end_time: string): number {
  const [sh, sm] = start_time.split(":").map(Number);
  const [eh, em] = end_time.split(":").map(Number);
  const diff = eh * 60 + em - (sh * 60 + sm);
  return Math.max(0, Math.round(diff / 5) * 5);
}

function versionData() {
  const now = Date.now();
  return {
    created_by: "",
    updated_by: "",
    created_at: now,
    updated_at: now,
  };
}

export function useMinistryTime() {
  const { data } = useLiveQuery((q) =>
    q.from({ mt: ministryTimeLocalCollection }).orderBy(({ mt }) => mt.date),
  );
  const entries = (data as MinistryTimeEntry[] | undefined) ?? [];

  function addEntry(
    date: string,
    start_time: string,
    end_time: string,
    ministry_type: MinistryType,
    note: string,
  ) {
    const minutes = computeMinutes(start_time, end_time);
    ministryTimeLocalCollection.insert({
      entry_id: crypto.randomUUID(),
      date,
      start_time,
      end_time,
      minutes,
      ministry_type,
      note,
      version: versionData(),
    });
  }

  function updateEntry(
    entry_id: string,
    date: string,
    start_time: string,
    end_time: string,
    ministry_type: MinistryType,
    note: string,
  ) {
    const minutes = computeMinutes(start_time, end_time);
    ministryTimeLocalCollection.update(entry_id, (draft) => {
      draft.date = date;
      draft.start_time = start_time;
      draft.end_time = end_time;
      draft.minutes = minutes;
      draft.ministry_type = ministry_type;
      draft.note = note;
      draft.version.updated_at = Date.now();
    });
  }

  function deleteEntry(entry_id: string) {
    ministryTimeLocalCollection.delete(entry_id);
  }

  const now = new Date();
  const current_month_prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const month_entries = entries.filter((e) => e.date.startsWith(current_month_prefix));
  const total_minutes = month_entries.reduce((sum, e) => sum + e.minutes, 0);
  const total_hours = (total_minutes / 60).toFixed(1);

  return { entries, addEntry, updateEntry, deleteEntry, total_minutes, total_hours };
}
