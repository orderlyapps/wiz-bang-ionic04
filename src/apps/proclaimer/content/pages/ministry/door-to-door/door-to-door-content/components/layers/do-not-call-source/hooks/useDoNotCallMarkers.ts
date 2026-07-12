import { useLiveQuery, eq } from "@tanstack/react-db";
import { doNotCallCollection } from "@shared/database/collections/do-not-call";
import { streetCollection } from "@shared/database/collections/street";
import { suburbCollection } from "@shared/database/collections/suburb";
import type { DoNotCall } from "../types";

type GroupedDoNotCall = Record<string, (DoNotCall & { coordinates: [number, number] })[]>;

export function useDoNotCallMarkers(): GroupedDoNotCall | null {
  const { data } = useLiveQuery((q) =>
    q
      .from({ dnc: doNotCallCollection })
      .join({ st: streetCollection }, ({ st, dnc }) => eq(st.id, dnc.street_id))
      .join({ sb: suburbCollection }, ({ sb, dnc }) => eq(sb.id, dnc.suburb_id))
      .select(({ dnc, st, sb }) => ({
        ...dnc,
        street: st?.name ?? "",
        suburb: sb?.name ?? "",
      })),
  ) as { data: DoNotCall[] | undefined };

  if (!data) return null;

  const validData = data.filter(
    (dnc): dnc is DoNotCall & { coordinates: [number, number] } =>
      dnc.coordinates !== null && Array.isArray(dnc.coordinates) && dnc.coordinates.length === 2,
  );

  return validData.reduce<GroupedDoNotCall>((acc, dnc) => {
    const key = `${dnc.suburb}|${dnc.street}|${dnc.house_number}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(dnc);
    return acc;
  }, {});
}
