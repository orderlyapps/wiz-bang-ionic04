import { useLiveQuery } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { publisherCollection } from "@shared/database/collections/publisher";

export type AddressPoint = {
  publisher_id: string;
  address_id: string;
  coordinates: [number, number];
};

export function usePublisherAddressPoints(): AddressPoint[] | null {
  const { data: locals } = useLiveQuery((q) => q.from({ p: publisherLocalCollection }));
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  if (!locals || !publishers) return null;

  const archivedIds = new Set<string>();
  for (const publisher of publishers) {
    if (publisher.id && publisher.archived_at) {
      archivedIds.add(publisher.id);
    }
  }

  const points: AddressPoint[] = [];
  for (const publisher of locals) {
    if (archivedIds.has(publisher.publisher_id)) continue;
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
