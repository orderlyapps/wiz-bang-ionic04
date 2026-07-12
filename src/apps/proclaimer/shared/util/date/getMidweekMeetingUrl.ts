import { differenceInWeeks, isMonday, nextMonday, parseISO, startOfMonth } from "date-fns";

function getFirstMondayOfMonth(year: number, monthIndex: number): Date {
  const first = startOfMonth(new Date(year, monthIndex, 1));
  if (isMonday(first)) return first;
  return nextMonday(first);
}

export function getMidweekMeetingUrl(week_id: string): string {
  const date = parseISO(week_id);
  const year = date.getFullYear();
  const month = date.getMonth();

  const issueIndex = Math.floor(month / 2);
  const issueStartMonth = issueIndex * 2;
  const firstMonday = getFirstMondayOfMonth(year, issueStartMonth);
  const weekIndex = differenceInWeeks(date, firstMonday);

  const base = issueIndex * 80 + 1;
  const docid = `20${year}${String(base + weekIndex).padStart(3, "0")}`;

  return `https://www.jw.org/finder?srcid=jwlshare&wtlocale=E&prefer=lang&docid=${docid}`;
}
