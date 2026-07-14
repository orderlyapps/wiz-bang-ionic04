import { useLiveQuery, eq } from "@tanstack/react-db";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import { streetCollection } from "@shared/database/collections/street";
import { suburbCollection } from "@shared/database/collections/suburb";
import type { ReturnVisit } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/return-visit-source/types";

export function useAllReturnVisits(): ReturnVisit[] | null {
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

  return data.filter(
    (rv): rv is ReturnVisit & { coordinates: [number, number] } =>
      rv.coordinates !== null && Array.isArray(rv.coordinates) && rv.coordinates.length === 2,
  );
}
