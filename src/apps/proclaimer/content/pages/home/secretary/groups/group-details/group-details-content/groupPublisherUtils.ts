import type { Publisher } from "@shared/database/schemas/publisher";

export const DEFAULT_PUBLISHER_TYPES = [
  "publisher",
  "regular_pioneer",
  "special_pioneer",
  "continuous_auxiliary",
];
export const ALL_LIST_TYPES = [...DEFAULT_PUBLISHER_TYPES, "inactive", "associate"];
const EXCLUDED_TYPES = ["speaker"];

export function isListablePublisher(p: Publisher, include_confidential: boolean): boolean {
  if (p.archived_at || EXCLUDED_TYPES.includes(p.type)) return false;
  const allowed_types = include_confidential ? ALL_LIST_TYPES : DEFAULT_PUBLISHER_TYPES;
  return allowed_types.includes(p.type);
}
