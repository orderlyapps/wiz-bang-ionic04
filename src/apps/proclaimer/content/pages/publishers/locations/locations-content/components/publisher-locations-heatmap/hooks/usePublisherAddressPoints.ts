import { useLiveQuery } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { publisherCollection } from "@shared/database/collections/publisher";

export type AddressPoint = {
  publisher_id: string;
  address_id: string;
  coordinates: [number, number];
};

export function usePublisherAddressPoints(group_id?: string | null): AddressPoint[] | null {
  const { data: locals } = useLiveQuery((q) => q.from({ p: publisherLocalCollection }));
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  if (!locals || !publishers) return null;

  const excludedIds = new Set<string>();
  for (const publisher of publishers) {
    if (!publisher.id) continue;
    if (publisher.archived_at) {
      excludedIds.add(publisher.id);
      continue;
    }
    if (group_id && group_id !== "all" && publisher.group_id !== group_id) {
      excludedIds.add(publisher.id);
    }
  }

  const points: AddressPoint[] = [];
  for (const publisher of locals) {
    if (excludedIds.has(publisher.publisher_id)) continue;
    for (const address of publisher.address ?? []) {
      const coords = address.coordinates;
      if (Array.isArray(coords) && coords.length >= 2) {
        points.push({
          publisher_id: publisher.publisher_id,
          address_id: address.id,
          coordinates: [coords[0], coords[1]],
        });
      }
    }
  }
  return points;
}
