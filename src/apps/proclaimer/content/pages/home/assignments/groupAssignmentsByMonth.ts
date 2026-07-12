import { format, parseISO } from "date-fns";
import type { Assignment } from "./useAssignments";

export type AssignmentMonthGroup = {
  label: string;
  assignments: Assignment[];
};

const currentYear = new Date().getFullYear();

export const groupAssignmentsByMonth = (assignments: Assignment[]): AssignmentMonthGroup[] => {
  const groups: Map<string, Assignment[]> = new Map();

  for (const assignment of assignments) {
    const date = parseISO(assignment.week_id);
    const pattern = date.getFullYear() === currentYear ? "MMMM" : "MMMM yyyy";
    const key = format(date, pattern);
    const existing = groups.get(key);
    if (existing) {
      existing.push(assignment);
    } else {
      groups.set(key, [assignment]);
    }
  }

  return Array.from(groups, ([label, assignments]) => ({ label, assignments }));
};
