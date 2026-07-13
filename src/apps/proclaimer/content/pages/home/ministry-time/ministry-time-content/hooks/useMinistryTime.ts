import { useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "@util/constants/localStorageKeys";

export interface MinistryTimeEntry {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  minutes: number;
  note: string;
}

const STORAGE_KEY = localStorageKeys.ministryTimeTracker;

function computeMinutes(start_time: string, end_time: string): number {
  const [sh, sm] = start_time.split(":").map(Number);
  const [eh, em] = end_time.split(":").map(Number);
  const diff = eh * 60 + em - (sh * 60 + sm);
  return Math.max(0, Math.round(diff / 5) * 5);
}

function loadEntries(): MinistryTimeEntry[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as MinistryTimeEntry[];
  } catch {
    return [];
  }
}

function saveEntries(entries: MinistryTimeEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useMinistryTime() {
  const [entries, setEntries] = useState<MinistryTimeEntry[]>(loadEntries);

  useEffect(() => {
    function handleStorage() {
      setEntries(loadEntries());
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addEntry = useCallback(
    (date: string, start_time: string, end_time: string, note: string) => {
      const minutes = computeMinutes(start_time, end_time);
      const entry: MinistryTimeEntry = {
        id: crypto.randomUUID(),
        date,
        start_time,
        end_time,
        minutes,
        note,
      };
      setEntries((prev) => {
        const next = [...prev, entry].sort((a, b) => a.date.localeCompare(b.date));
        saveEntries(next);
        return next;
      });
    },
    [],
  );

  const updateEntry = useCallback(
    (id: string, date: string, start_time: string, end_time: string, note: string) => {
      const minutes = computeMinutes(start_time, end_time);
      setEntries((prev) => {
        const next = prev
          .map((e) => (e.id === id ? { ...e, date, start_time, end_time, minutes, note } : e))
          .sort((a, b) => a.date.localeCompare(b.date));
        saveEntries(next);
        return next;
      });
    },
    [],
  );

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  }, []);

  const now = new Date();
  const current_month_prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const month_entries = entries.filter((e) => e.date.startsWith(current_month_prefix));
  const total_minutes = month_entries.reduce((sum, e) => sum + e.minutes, 0);
  const total_hours = (total_minutes / 60).toFixed(1);

  return { entries, addEntry, updateEntry, deleteEntry, total_minutes, total_hours };
}
