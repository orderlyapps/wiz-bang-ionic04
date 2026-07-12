import { startOfWeek, endOfWeek, isWithinInterval, addWeeks } from "date-fns";

interface FormatOptions {
  format?:
    | "week-label"
    | "week-label-capital-case"
    | "week-range"
    | "week-range-capital-case"
    | "event-date";
  useRelativeWeek?: boolean;
  relativeWeekStyle?: "replace" | "append";
  end_date?: string | null;
}

/**
 * Formats a date string into a readable week label
 * @param dateStr - Date string in YYYY-MM-DD format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const getTheocraticWeekLabel = (dateStr: string, options: FormatOptions = {}): string => {
  const { format = "week-range", useRelativeWeek = false, relativeWeekStyle = "replace" } = options;

  if (!dateStr) {
    return "Invalid Date";
  }

  const [year, month, day] = dateStr.split("-").map(Number);

  let relativeLabel: string | null = null;

  if (useRelativeWeek) {
    const date = new Date(year, month - 1, day);
    const today = new Date();

    // Get the start and end of the current week (Monday-Sunday)
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

    // Get the start and end of next week
    const nextWeekStart = startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });
    const nextWeekEnd = endOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });

    // Check if date is in current week
    if (isWithinInterval(date, { start: currentWeekStart, end: currentWeekEnd })) {
      relativeLabel = "This Week";
    }

    // Check if date is in next week
    if (isWithinInterval(date, { start: nextWeekStart, end: nextWeekEnd })) {
      relativeLabel = "Next Week";
    }

    if (relativeLabel && relativeWeekStyle === "replace") {
      return relativeLabel;
    }

    // For "append" style, fall through and add the label at the end
  }

  const appendRelative = (str: string): string =>
    relativeLabel ? `${str} (${relativeLabel})` : str;

  if (format === "week-label" || format === "week-label-capital-case") {
    // Format: "Monday, September 8"
    const date = new Date(year, month - 1, day);
    return appendRelative(
      date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );
  }

  if (format === "event-date") {
    // Format: "SEPTEMBER 8 (MONDAY)" for single-day, "SEPTEMBER 8–10" or "SEPTEMBER 8–OCTOBER 2" for ranges
    const startDate = new Date(year, month - 1, day);

    if (!options.end_date || options.end_date === dateStr) {
      const dayName = startDate.toLocaleDateString(undefined, { weekday: "long" });
      const month = startDate.toLocaleDateString(undefined, { month: "long" });
      const day = startDate.toLocaleDateString(undefined, { day: "numeric" });
      return appendRelative(`${month.toUpperCase()} ${day} (${dayName})`);
    }

    const [eYear, eMonth, eDay] = options.end_date.split("-").map(Number);
    const endDate = new Date(eYear, eMonth - 1, eDay);

    const startMonth = startDate.toLocaleDateString(undefined, { month: "long" });
    const endMonth = endDate.toLocaleDateString(undefined, { month: "long" });

    if (startMonth === endMonth) {
      return appendRelative(`${startMonth} ${day}–${eDay}`.toUpperCase());
    }
    return appendRelative(`${startMonth} ${day}–${endMonth} ${eDay}`.toUpperCase());
  }

  // Default format: "MMMM DD - MMMM DD" (second month only if different)
  const startDate = new Date(year, month - 1, day);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const startMonth = startDate.toLocaleDateString(undefined, { month: "long" });
  const startDay = startDate.getDate();

  const endMonth = endDate.toLocaleDateString(undefined, { month: "long" });
  const endDay = endDate.getDate();

  const isCapitalCase = format === "week-range-capital-case";

  if (startMonth === endMonth) {
    return appendRelative(
      `${!isCapitalCase ? startMonth.toUpperCase() : startMonth} ${startDay}–${endDay}`,
    );
  } else {
    return appendRelative(
      `${!isCapitalCase ? startMonth.toUpperCase() : startMonth} ${startDay}–${!isCapitalCase ? endMonth.toUpperCase() : endMonth} ${endDay}`,
    );
  }
};
