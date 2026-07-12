import type {
  MapboxGeocodingFeature,
  MapboxGeocodingResponse,
} from "@util/vendor/mapbox/types/MapboxGeocodingResponse";
import { mapboxToken } from "@util/vendor/mapbox/mapboxToken";

export async function searchSuburbs(
  query: string,
  bbox?: [number, number, number, number],
): Promise<MapboxGeocodingFeature[]> {
  let paddedBbox: [number, number, number, number] | undefined;

  if (bbox) {
    const padding = 0.3;
    const [minLng, minLat, maxLng, maxLat] = bbox;
    paddedBbox = [
      Math.max(-180, minLng - padding),
      Math.max(-90, minLat - padding),
      Math.min(180, maxLng + padding),
      Math.min(90, maxLat + padding),
    ];
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    let url =
      `https://api.mapbox.com/search/geocode/v6/forward?` +
      `q=${encodedQuery}&` +
      `access_token=${mapboxToken}&` +
      `country=AU&` +
      `limit=10&` +
      `types=locality,place`;

    if (paddedBbox) {
      const bboxParam = paddedBbox.join(",");
      url += `&bbox=${bboxParam}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status} ${response.statusText}`);
    }

    const { features }: MapboxGeocodingResponse = await response.json();

    return features;
  } catch (error) {
    console.error("Suburb search error:", error);
    throw error;
  }
}
