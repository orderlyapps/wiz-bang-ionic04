import type { LngLatBoundsLike } from "mapbox-gl";

export function isValidBoundary(boundary: unknown): boundary is number[][] {
  if (!Array.isArray(boundary) || boundary.length === 0) return false;
  return boundary.every(
    (coord) =>
      Array.isArray(coord) &&
      coord.length >= 2 &&
      typeof coord[0] === "number" &&
      typeof coord[1] === "number",
  );
}

export function isClosedRing(boundary: number[][]): boolean {
  if (boundary.length < 4) return false;
  const first = boundary[0];
  const last = boundary[boundary.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}

export function ensureClosedRing(boundary: number[][]): number[][] {
  if (isClosedRing(boundary)) return boundary;
  return [...boundary, boundary[0]];
}

export function boundaryToBounds(boundary: unknown): LngLatBoundsLike | null {
  if (!isValidBoundary(boundary) || boundary.length < 4) return null;
  let minLng = boundary[0][0];
  let maxLng = boundary[0][0];
  let minLat = boundary[0][1];
  let maxLat = boundary[0][1];
  for (const [lng, lat] of boundary) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLng, minLat, maxLng, maxLat];
}

export function boundaryToPolygonCoords(boundary: unknown): number[][][] | null {
  if (!isValidBoundary(boundary) || boundary.length < 4) return null;
  return [ensureClosedRing(boundary)];
}

export function blockCoordinatesToBounds(boundary: unknown): LngLatBoundsLike | null {
  if (!isValidBoundary(boundary) || boundary.length === 0) return null;
  let minLng = boundary[0][0];
  let maxLng = boundary[0][0];
  let minLat = boundary[0][1];
  let maxLat = boundary[0][1];
  for (const [lng, lat] of boundary) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLng, minLat, maxLng, maxLat];
}

export function blockToPolygonCoords(
  coordinates: unknown[] | null | undefined,
): number[][][] | null {
  if (!isValidBoundary(coordinates) || coordinates.length < 3) return null;
  return [ensureClosedRing(coordinates)];
}

export function blockToLineStringCoords(
  coordinates: unknown[] | null | undefined,
): number[][] | null {
  if (!isValidBoundary(coordinates) || coordinates.length < 2) return null;
  return coordinates;
}
