import type {
  MapboxGeocodingFeature,
  MapboxGeocodingResponse,
} from "@util/vendor/mapbox/types/MapboxGeocodingResponse";
import { mapboxToken } from "@util/vendor/mapbox/mapboxToken";

export async function searchStreets(
  query: string,
  bbox: [number, number, number, number],
  padding: number = 0.01,
): Promise<MapboxGeocodingFeature[]> {
  try {
    // Apply padding to bbox
    const [minLng, minLat, maxLng, maxLat] = bbox;
    const paddedBbox = [minLng - padding, minLat - padding, maxLng + padding, maxLat + padding];

    const encodedQuery = encodeURIComponent(query);
    const bboxParam = paddedBbox.join(",");

    // Try multiple search strategies
    const searchUrls =
      // Strategy 1: Search for addresses and streets within bbox
      `https://api.mapbox.com/search/geocode/v6/forward?` +
      `q=${encodedQuery}&` +
      `access_token=${mapboxToken}&` +
      `country=AU&` +
      `limit=10&` +
      `types=address,street&` +
      `bbox=${bboxParam}`;

    const response = await fetch(searchUrls);

    const { features }: MapboxGeocodingResponse = await response.json();

    return features;
  } catch (error) {
    console.error("Street search error:", error);
    throw error;
  }
}
