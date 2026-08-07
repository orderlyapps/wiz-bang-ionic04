import { startOfWeek } from "date-fns/startOfWeek";
import { format } from "date-fns/format";

/** Monday of the week containing the given date, as `yyyy-MM-dd`. */
export function getWeekStart(date: Date): string {
  return format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
}
