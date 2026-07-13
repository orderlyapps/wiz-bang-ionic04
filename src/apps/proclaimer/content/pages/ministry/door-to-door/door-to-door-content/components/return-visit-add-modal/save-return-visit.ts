import { returnVisitCollection } from "@shared/database/collections/return-visit";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { geocodeAddress } from "@util/vendor/mapbox/helper/geocodeAddress";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

type SaveReturnVisitData = {
  suburb: Suburb;
  street: Street;
  house_number: string;
  unit_number: string;
};

export async function saveReturnVisit(data: SaveReturnVisitData): Promise<[number, number] | null> {
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

  returnVisitCollection.insert({
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    coordinates: [longitude, latitude],
    congregation_id,
    suburb_id,
    street_id,
    house_number: data.house_number,
    unit_number: data.unit_number.trim() || undefined,
    first_name: "",
    last_name: "",
    phone_number: "",
    notes: "",
    visit_log: [
      {
        id: crypto.randomUUID(),
        visited_at: new Date().toISOString(),
        notes: "",
      },
    ],
    match_data: feature.properties,
  });

  return [longitude, latitude];
}
