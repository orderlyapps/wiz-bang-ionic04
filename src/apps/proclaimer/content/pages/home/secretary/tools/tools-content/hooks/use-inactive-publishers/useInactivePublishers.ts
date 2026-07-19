import { useLiveQuery, eq, and, inArray, isNull } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { reportCollection } from "@shared/database/collections/report";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getInactivePublisherIds } from "@proclaimer-content/pages/home/reports/reports-content/utils/inactive-publishers";

const PUBLISHER_TYPES = ["publisher", "regular_pioneer", "special_pioneer", "continuous_auxiliary"];

export function useInactivePublishers() {
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data: publishers, isLoading } = useLiveQuery(
    (q) =>
      congregation_id
        ? q
            .from({ p: publisherCollection })
            .where(({ p }) =>
              and(
                eq(p.congregation_id, congregation_id),
                inArray(p.type, PUBLISHER_TYPES),
                isNull(p.archived_at),
              ),
            )
            .orderBy(({ p }) => p.last_name)
        : undefined,
    [congregation_id],
  );

  const { data: local_publishers } = useLiveQuery((q) => q.from({ pl: publisherLocalCollection }));

  const { data: reports } = useLiveQuery((q) => q.from({ r: reportCollection }));

  const publisher_by_confidential = new Map<string, Publisher>();
  for (const local of local_publishers ?? []) {
    const pub = (publishers ?? []).find((p) => p.id === local.publisher_id);
    if (pub) {
      publisher_by_confidential.set(local.confidential_id, pub);
    }
  }

  const inactive_ids = getInactivePublisherIds(reports ?? [], [
    ...publisher_by_confidential.keys(),
  ]);
  const inactive_publishers = inactive_ids
    .map((id) => publisher_by_confidential.get(id))
    .filter((p): p is Publisher => p != null);

  return { inactive_publishers, isLoading };
}
