import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { usePublisherAddressPoints } from "@proclaimer-content/pages/publishers/locations/locations-content/components/publisher-locations-heatmap/hooks/usePublisherAddressPoints";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { PublisherName } from "@proclaimer-shared/publisher/publisherUtils";

export type PublisherAtAddress = PublisherName & {
  publisher_id: string;
};

export type AddressPublisherGroup = {
  group_key: string;
  coordinates: [number, number];
  publishers: PublisherAtAddress[];
};

export function useGroupedPublisherLocations(
  group_id?: string | null,
): AddressPublisherGroup[] | null {
  const points = usePublisherAddressPoints(group_id);
  const { data } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  if (!points || !data) return null;

  const publisherMap = new Map<string, Publisher>();
  for (const publisher of data) {
    if (publisher.id && !publisher.archived_at) publisherMap.set(publisher.id, publisher);
  }

  const groups = new Map<string, AddressPublisherGroup>();
  for (const point of points) {
    const key = `${point.coordinates[0]},${point.coordinates[1]}`;
    const publisher = publisherMap.get(point.publisher_id);

    if (!groups.has(key)) {
      groups.set(key, {
        group_key: key,
        coordinates: point.coordinates,
        publishers: [],
      });
    }

    if (!publisher) continue;
    groups.get(key)!.publishers.push({
      publisher_id: point.publisher_id,
      first_name: publisher.first_name,
      middle_name: publisher.middle_name,
      last_name: publisher.last_name,
      display_name: publisher.display_name,
    });
  }

  return Array.from(groups.values());
}
