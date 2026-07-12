import { useLiveQuery, eq } from "@tanstack/react-db";
import { notAtHomeCollection } from "@shared/database/collections/not-at-home";
import { streetCollection } from "@shared/database/collections/street";
import { suburbCollection } from "@shared/database/collections/suburb";
import type { NotAtHome } from "../types";

type GroupedNotAtHome = Record<string, (NotAtHome & { coordinates: [number, number] })[]>;

export function useNotAtHomeMarkers(): GroupedNotAtHome | null {
  const { data } = useLiveQuery((q) =>
    q
      .from({ nah: notAtHomeCollection })
      .join({ st: streetCollection }, ({ st, nah }) => eq(st.id, nah.street_id))
      .join({ sb: suburbCollection }, ({ sb, nah }) => eq(sb.id, nah.suburb_id))
      .select(({ nah, st, sb }) => ({
        ...nah,
        street: st?.name ?? "",
        suburb: sb?.name ?? "",
      })),
  ) as { data: NotAtHome[] | undefined };

  if (!data) return null;

  const validData = data.filter(
    (nah): nah is NotAtHome & { coordinates: [number, number] } =>
      nah.coordinates !== null && Array.isArray(nah.coordinates) && nah.coordinates.length === 2,
  );

  return validData.reduce<GroupedNotAtHome>((acc, nah) => {
    const key = `${nah.suburb}|${nah.street}|${nah.house_number}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(nah);
    return acc;
  }, {});
}
