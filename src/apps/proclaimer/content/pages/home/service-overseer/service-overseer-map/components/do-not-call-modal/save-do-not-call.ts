import { doNotCallCollection } from "@shared/database/collections/do-not-call";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { geocodeAddress } from "@util/vendor/mapbox/helper/geocodeAddress";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

type SaveDoNotCallData = {
  suburb: Suburb;
  street: Street;
  house_number: string;
  unit_number: string;
  notes: string;
};

export async function saveDoNotCall(data: SaveDoNotCallData): Promise<[number, number] | null> {
  const congregation = getStoredCongregation();
  const congregation_id = congregation?.id;
  const suburb_id = data.suburb.id;
  const street_id = data.street.id;
  if (!congregation_id || !suburb_id || !street_id) return null;

  const bbox = data.suburb.bbox;
  if (bbox.length !== 4) return null;

  const feature = await geocodeAddress(
    {
      address_number: data.house_number,
      street: data.street.name,
      place: data.suburb.name,
    },
    { bbox: bbox as [number, number, number, number] },
  );

  if (!feature) return null;

  const [longitude, latitude] = feature.geometry.coordinates;

  doNotCallCollection.insert({
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    coordinates: [longitude, latitude],
    congregation_id,
    suburb_id,
    street_id,
    house_number: data.house_number,
    unit_number: data.unit_number.trim() || undefined,
    notes: data.notes.trim() || undefined,
    match_data: feature.properties,
  });

  return [longitude, latitude];
}
