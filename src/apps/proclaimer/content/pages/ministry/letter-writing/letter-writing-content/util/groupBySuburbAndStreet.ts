import type { NotAtHome } from "@shared/database/schemas/not-at-home";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

export type AddressItem = NotAtHome & {
  suburbName: string;
  streetName: string;
};

export type StreetGroup = {
  streetId: string;
  streetName: string;
  addresses: AddressItem[];
};

export type SuburbGroup = {
  suburbId: string;
  suburbName: string;
  streets: StreetGroup[];
};

export function groupBySuburbAndStreet(
  addresses: NotAtHome[],
  suburbs: Suburb[],
  streets: Street[],
): SuburbGroup[] {
  const suburbMap = new Map(suburbs.map((s) => [s.id, s.name]));
  const streetMap = new Map(streets.map((s) => [s.id, s.name]));

  const suburbGroups = new Map<string, Map<string, AddressItem[]>>();

  for (const address of addresses) {
    const suburbName = suburbMap.get(address.suburb_id) ?? "Unknown Suburb";
    const streetName = streetMap.get(address.street_id) ?? "Unknown Street";

    if (!suburbGroups.has(address.suburb_id)) {
      suburbGroups.set(address.suburb_id, new Map());
    }

    const streetGroups = suburbGroups.get(address.suburb_id)!;

    if (!streetGroups.has(address.street_id)) {
      streetGroups.set(address.street_id, []);
    }

    streetGroups.get(address.street_id)!.push({
      ...address,
      suburbName,
      streetName,
    });
  }

  const result: SuburbGroup[] = [];

  for (const [suburbId, streetGroups] of suburbGroups) {
    const streets: StreetGroup[] = [];

    for (const [streetId, addresses] of streetGroups) {
      streets.push({
        streetId,
        streetName: streetMap.get(streetId) ?? "Unknown Street",
        addresses: addresses.sort((a, b) =>
          a.house_number.localeCompare(b.house_number, undefined, { numeric: true }),
        ),
      });
    }

    streets.sort((a, b) => a.streetName.localeCompare(b.streetName));

    result.push({
      suburbId,
      suburbName: suburbMap.get(suburbId) ?? "Unknown Suburb",
      streets,
    });
  }

  result.sort((a, b) => a.suburbName.localeCompare(b.suburbName));

  return result;
}
