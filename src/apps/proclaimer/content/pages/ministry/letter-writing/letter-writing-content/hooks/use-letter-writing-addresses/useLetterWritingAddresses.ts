import { useLiveQuery } from "@tanstack/react-db";
import { notAtHomeCollection } from "@shared/database/collections/not-at-home";
import { suburbCollection } from "@shared/database/collections/suburb";
import { streetCollection } from "@shared/database/collections/street";
import { getStoredCongregation } from "@util/app/congregation/utils";
import type { NotAtHome } from "@shared/database/schemas/not-at-home";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

const MAX_ADDRESSES = 0;

export function useLetterWritingAddresses(): {
  addresses: NotAtHome[];
  suburbs: Suburb[];
  streets: Street[];
  isLoading: boolean;
} {
  const { data: addresses, isLoading: is_addresses_loading } = useLiveQuery((q) =>
    q.from({ nah: notAtHomeCollection }),
  );
  const { data: suburbs, isLoading: is_suburbs_loading } = useLiveQuery((q) =>
    q.from({ s: suburbCollection }),
  );
  const { data: streets, isLoading: is_streets_loading } = useLiveQuery((q) =>
    q.from({ st: streetCollection }),
  );

  const congregation_id = getStoredCongregation()?.id;
  const filtered = (addresses ?? []).filter(
    (address) => address.congregation_id === congregation_id,
  );

  const write_addresses = filtered.filter((address) => address.write);
  const non_write_addresses = filtered
    .filter((address) => !address.write)
    .slice()
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .slice(0, MAX_ADDRESSES);

  const result =
    write_addresses.length >= MAX_ADDRESSES
      ? write_addresses
      : [...write_addresses, ...non_write_addresses];

  return {
    addresses: result,
    suburbs: suburbs ?? [],
    streets: streets ?? [],
    isLoading: is_addresses_loading || is_suburbs_loading || is_streets_loading,
  };
}
