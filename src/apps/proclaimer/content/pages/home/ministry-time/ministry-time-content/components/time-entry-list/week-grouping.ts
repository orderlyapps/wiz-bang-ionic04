import type { MinistryTimeEntry } from "../../hooks/useMinistryTime";

export interface WeekGroup {
  week_start: string;
  entries: MinistryTimeEntry[];
  total_minutes: number;
}

function toLocalISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - diff);
  return toLocalISO(d);
}

export function formatWeekRange(weekStartStr: string): string {
  const start = new Date(weekStartStr + "T00:00:00");
  const end = new Date(weekStartStr + "T00:00:00");
  end.setDate(end.getDate() + 6);
  const startStr = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endStr = end.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${startStr} – ${endStr}`;
}

export function groupEntriesByWeek(entries: MinistryTimeEntry[]): WeekGroup[] {
  const groups = new Map<string, WeekGroup>();
  for (const entry of entries) {
    const weekStart = getWeekStart(entry.date);
    if (!groups.has(weekStart)) {
      groups.set(weekStart, { week_start: weekStart, entries: [], total_minutes: 0 });
    }
    const group = groups.get(weekStart)!;
    group.entries.push(entry);
    group.total_minutes += entry.minutes;
  }
  return Array.from(groups.values())
    .sort((a, b) => b.week_start.localeCompare(a.week_start))
    .map((g) => ({
      ...g,
      entries: [...g.entries].sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return (b.start_time ?? "").localeCompare(a.start_time ?? "");
      }),
    }));
}
