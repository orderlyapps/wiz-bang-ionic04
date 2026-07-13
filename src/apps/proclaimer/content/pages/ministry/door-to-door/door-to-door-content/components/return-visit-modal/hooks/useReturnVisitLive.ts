import { useLiveQuery } from "@tanstack/react-db";
import { returnVisitCollection } from "@shared/database/collections/return-visit";
import type { ReturnVisitLocal } from "@shared/database/rxdb/collections/return-visit";

export function useReturnVisitLive(id: string | undefined): ReturnVisitLocal | undefined {
  const { data } = useLiveQuery((q) =>
    q.from({ rv: returnVisitCollection }).select(({ rv }) => rv),
  ) as { data: ReturnVisitLocal[] | undefined };

  return id ? data?.find((r) => r.id === id) : undefined;
}
