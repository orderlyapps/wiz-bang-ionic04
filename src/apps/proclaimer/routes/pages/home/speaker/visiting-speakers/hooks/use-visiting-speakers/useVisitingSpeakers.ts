import { useLiveQuery, and, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { congregationCollection } from "@shared/database/collections/congregation";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";

export type VisitingSpeaker = {
  id?: string;
  first_name: string;
  last_name: string;
  display_name?: string | null;
  congregation_id: string;
  congregation_name?: string;
};

export function useVisitingSpeakers() {
  const congregation_id = useStoredCongregation()?.id ?? "";

  const { data, isLoading } = useLiveQuery(
    (q) =>
      q
        .from({ p: publisherCollection })
        .leftJoin({ c: congregationCollection }, ({ p, c }) => eq(p.congregation_id, c!.id))
        .where(({ p }) =>
          and(eq(p.type, "speaker"), p.congregation_id !== congregation_id, eq(p.gender, "male")),
        )
        .orderBy(({ p }) => p.last_name)
        .select(({ p, c }) => ({
          id: p.id,
          first_name: p.first_name,
          last_name: p.last_name,
          display_name: p.display_name,
          congregation_id: p.congregation_id,
          congregation_name: c?.name,
          archived_at: p.archived_at,
        })),
    [congregation_id],
  );

  const visiting_speakers = (
    (data as (VisitingSpeaker & { archived_at?: string | null })[] | undefined) ?? []
  ).filter((s) => !s.archived_at) as VisitingSpeaker[];

  return { visiting_speakers, is_loading: isLoading };
}
