import { useLiveQuery, eq } from "@tanstack/react-db";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import { streetCollection } from "@shared/database/collections/street";
import { suburbCollection } from "@shared/database/collections/suburb";
import type { ReturnVisit } from "../types";

type GroupedReturnVisit = Record<string, (ReturnVisit & { coordinates: [number, number] })[]>;

export function useReturnVisitMarkers(): GroupedReturnVisit | null {
  const { data } = useLiveQuery((q) =>
    q
      .from({ rv: returnVisitCollection })
      .join({ st: streetCollection }, ({ st, rv }) => eq(st.id, rv.street_id))
      .join({ sb: suburbCollection }, ({ sb, rv }) => eq(sb.id, rv.suburb_id))
      .select(({ rv, st, sb }) => ({
        ...rv,
        street: st?.name ?? "",
        suburb: sb?.name ?? "",
      })),
  ) as { data: ReturnVisit[] | undefined };

  if (!data) return null;

  const validData = data.filter(
    (rv): rv is ReturnVisit & { coordinates: [number, number] } =>
      rv.coordinates !== null && Array.isArray(rv.coordinates) && rv.coordinates.length === 2,
  );

  return validData.reduce<GroupedReturnVisit>((acc, rv) => {
    const key = `${rv.suburb}|${rv.street}|${rv.house_number}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(rv);
    return acc;
  }, {});
}
