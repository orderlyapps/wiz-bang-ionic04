import type { Publisher } from "@shared/database/schemas/publisher";

/**
 * Formats a publisher's name for display
 * Uses display_name if available, otherwise combines first and last name
 */
export function formatPublisherName(publisher: Publisher): string {
  if (publisher.display_name) {
    return publisher.display_name;
  }

  return `${publisher.first_name} ${publisher.last_name}`;
}
