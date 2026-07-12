import { intervalToDuration } from "date-fns";

export function getYearsMonthsSince(date_str: string, end_date?: string): string {
  if (!date_str) return "";
  const [year, month, day] = date_str.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const end = end_date
    ? (() => {
        const [eYear, eMonth, eDay] = end_date.split("-").map(Number);
        return new Date(eYear, eMonth - 1, eDay);
      })()
    : new Date();
  const { years = 0, months = 0 } = intervalToDuration({ start, end });

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  return parts.length > 0 ? parts.join(", ") : "0 months";
}
