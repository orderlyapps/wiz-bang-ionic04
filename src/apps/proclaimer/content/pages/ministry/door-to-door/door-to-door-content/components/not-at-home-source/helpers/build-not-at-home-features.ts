import type { NotAtHome } from "../types";

type NotAtHomeWithCoordinates = NotAtHome & { coordinates: [number, number] };

export type NotAtHomeFeature = {
  type: "Feature";
  id: string;
  properties: NotAtHomeWithCoordinates & {
    group_key: string;
    unit_count: number;
    unit_data: NotAtHomeWithCoordinates[];
    write_count: number;
    return_count: number;
  };
  geometry: { type: "Point"; coordinates: [number, number] };
};

export function buildNotAtHomeFeatures(
  groupedByAddress: Record<string, NotAtHomeWithCoordinates[]>,
): NotAtHomeFeature[] {
  return Object.entries(groupedByAddress).map(([group_key, group]) => {
    const firstItem = group[0];
    const write_count = group.filter((item) => item.write).length;
    const return_count = group.filter((item) => !item.write).length;

    return {
      type: "Feature",
      id: firstItem.id,
      properties: {
        ...firstItem,
        group_key,
        unit_count: group.length,
        unit_data: group,
        write_count,
        return_count,
      },
      geometry: {
        type: "Point",
        coordinates: firstItem.coordinates,
      },
    };
  });
}
