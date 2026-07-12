import { useLiveQuery } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";

export function usePublisherPhoneLookup(): (id: string) => string | null {
  const { data } = useLiveQuery((q) => q.from({ p: publisherLocalCollection }));

  return (publisherId: string) => {
    if (!data) return null;
    const local = data.find((row) => row.publisher_id === publisherId);
    return local?.phone?.[0]?.number ?? null;
  };
}
