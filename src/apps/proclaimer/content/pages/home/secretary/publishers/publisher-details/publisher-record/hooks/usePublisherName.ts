import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export function usePublisherName(publisher_id: string): string {
  const { data: publishers } = useLiveQuery(
    (q) => q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
    [publisher_id],
  );
  const publisher = publishers?.[0];
  return publisher ? getPublisherDisplayName(publisher) : "Publisher";
}
