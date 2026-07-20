import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export type PublisherWithCoordinates = {
  publisher_id: string;
  display_name: string;
  coordinates: [number, number];
  group_id: string | null;
};

export function usePublishersWithCoordinates(): PublisherWithCoordinates[] | null {
  const { data: allPublishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const publishers = allPublishers?.filter((p) => !p.archived_at && p.type !== "speaker");
  const { data: locals } = useLiveQuery((q) => q.from({ p: publisherLocalCollection }));

  if (!publishers || !locals) return null;

  const coordsMap = new Map<string, [number, number]>();
  for (const local of locals) {
    if (coordsMap.has(local.publisher_id)) continue;
    for (const addr of local.address ?? []) {
      const coords = addr.coordinates;
      if (Array.isArray(coords) && coords.length >= 2) {
        coordsMap.set(local.publisher_id, [coords[0], coords[1]]);
        break;
      }
    }
  }

  const results: PublisherWithCoordinates[] = [];
  for (const pub of publishers) {
    if (!pub.id) continue;
    const coords = coordsMap.get(pub.id);
    if (!coords) continue;

    const display_name = getPublisherDisplayName(pub);

    results.push({
      publisher_id: pub.id,
      display_name,
      coordinates: coords,
      group_id: pub.group_id ?? null,
    });
  }

  results.sort((a, b) => a.display_name.localeCompare(b.display_name));
  return results;
}
