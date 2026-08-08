import { parseISO } from "date-fns/parseISO";
import { useLiveQuery } from "@tanstack/react-db";
import { eventCollection } from "@shared/database/collections/event";
import type { EventRow } from "@shared/database/schemas/event";

function isEventInWeek(event: EventRow, week_id: string): boolean {
  const [year, month, day] = week_id.split("-").map(Number);
  const weekStart = new Date(year, month - 1, day);
  const weekEnd = new Date(year, month - 1, day + 6);

  const eventDate = parseISO(event.start_date);
  return eventDate >= weekStart && eventDate <= weekEnd;
}

export function useCircuitVisitEvent(week_id: string) {
  const { data: events } = useLiveQuery((q) => q.from({ e: eventCollection }));

  const event = events?.find((e) => e.type === "circuit_visit" && isEventInWeek(e, week_id));

  return { event, is_loading: events === undefined };
}
