import type { Publisher } from "@shared/database/schemas/publisher";

export interface PublisherFilter {
  gender: "all" | "male" | "female";
  standing: "all" | Publisher["standing"][];
  type: "all" | Publisher["type"][];
  archived: "all" | "exclude" | "only";
}

export type PublisherSortOrder = "alphabetical" | "alphabetical_reverse" | "standing" | "type";

export const archivedOptions = [
  { label: "Exclude Archived", value: "exclude" },
  { label: "Include Archived", value: "all" },
  { label: "Only Archived", value: "only" },
] as const;

export const filterLabels = {
  all: "All",
  male: "Male",
  female: "Female",
} as const;

export const sortOrderLabels = {
  alphabetical: "Name (A-Z)",
  alphabetical_reverse: "Name (Z-A)",
  standing: "Standing",
  type: "Type",
} as const;
