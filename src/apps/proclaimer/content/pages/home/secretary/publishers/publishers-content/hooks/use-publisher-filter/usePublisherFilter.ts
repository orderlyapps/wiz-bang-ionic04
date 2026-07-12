import type { Publisher } from "@shared/database/schemas/publisher";
import type { PublisherFilter } from "./types";

export function filterPublishers(publishers: Publisher[], filter: PublisherFilter): Publisher[] {
  return publishers.filter((publisher) => {
    // Gender filter
    if (filter.gender !== "all" && publisher.gender !== filter.gender) {
      return false;
    }

    // Standing filter
    if (filter.standing !== "all" && !filter.standing.includes(publisher.standing)) {
      return false;
    }

    // Type filter
    if (filter.type !== "all" && !filter.type.includes(publisher.type)) {
      return false;
    }

    // Archived filter
    if (filter.archived === "exclude" && publisher.archived_at) {
      return false;
    }
    if (filter.archived === "only" && !publisher.archived_at) {
      return false;
    }

    return true;
  });
}
