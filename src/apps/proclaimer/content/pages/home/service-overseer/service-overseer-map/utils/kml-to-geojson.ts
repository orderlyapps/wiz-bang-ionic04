function parseCoordinates(text: string): number[][] {
  return text
    .trim()
    .split(/\s+/)
    .map((tuple) => tuple.split(",").map(Number).slice(0, 2))
    .filter((coord) => coord.length >= 2 && !coord.some(isNaN));
}

const KML_NS = "http://www.opengis.net/kml/2.2";

function getElementsByTagNameNS(parent: Element, localName: string): Element[] {
  const nsResult = parent.getElementsByTagNameNS(KML_NS, localName);
  if (nsResult.length > 0) return Array.from(nsResult);
  return Array.from(parent.getElementsByTagName(localName));
}

function parsePlacemark(placemark: Element): GeoJSON.Feature[] {
  const features: GeoJSON.Feature[] = [];
  const nameEl = placemark.getElementsByTagName("name")[0];
  const name = nameEl?.textContent?.trim() ?? "";

  const polygons = getElementsByTagNameNS(placemark, "Polygon");
  for (const polygon of polygons) {
    const outerRings = getElementsByTagNameNS(polygon, "outerBoundaryIs");
    for (const outer of outerRings) {
      const linearRings = getElementsByTagNameNS(outer, "LinearRing");
      for (const ring of linearRings) {
        const coordsEl = ring.getElementsByTagName("coordinates")[0];
        if (!coordsEl?.textContent) continue;
        const coords = parseCoordinates(coordsEl.textContent);
        if (coords.length < 4) continue;
        features.push({
          type: "Feature",
          geometry: { type: "Polygon", coordinates: [coords] },
          properties: { name },
        });
      }
    }
  }

  const lineStrings = getElementsByTagNameNS(placemark, "LineString");
  for (const line of lineStrings) {
    const coordsEl = line.getElementsByTagName("coordinates")[0];
    if (!coordsEl?.textContent) continue;
    const coords = parseCoordinates(coordsEl.textContent);
    if (coords.length < 2) continue;
    features.push({
      type: "Feature",
      geometry: { type: "LineString", coordinates: coords },
      properties: { name },
    });
  }

  const points = getElementsByTagNameNS(placemark, "Point");
  for (const point of points) {
    const coordsEl = point.getElementsByTagName("coordinates")[0];
    if (!coordsEl?.textContent) continue;
    const coords = parseCoordinates(coordsEl.textContent);
    if (coords.length < 1) continue;
    features.push({
      type: "Feature",
      geometry: { type: "Point", coordinates: coords[0] },
      properties: { name },
    });
  }

  return features;
}

export function kmlToGeoJSON(kmlText: string): GeoJSON.FeatureCollection {
  const parser = new DOMParser();
  const doc = parser.parseFromString(kmlText, "text/xml");

  const errorNode = doc.querySelector("parsererror");
  if (errorNode) {
    return { type: "FeatureCollection", features: [] };
  }

  const placemarks = getElementsByTagNameNS(doc.documentElement, "Placemark");
  const features = placemarks.flatMap(parsePlacemark);

  return { type: "FeatureCollection", features };
}
