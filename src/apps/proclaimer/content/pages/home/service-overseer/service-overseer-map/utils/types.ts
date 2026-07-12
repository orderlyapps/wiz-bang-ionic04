import type { LngLatBoundsLike } from "mapbox-gl";
import type { MapRow } from "@shared/database/schemas/map";

export type Block = NonNullable<MapRow["blocks"]>[number];

export type SelectedMap =
  | {
      type: "map";
      id: string;
      name: string;
      details: MapRow["details"];
      url: MapRow["url"];
      boundary: unknown;
      bounds?: LngLatBoundsLike;
      blocks: MapRow["blocks"];
    }
  | { type: "master"; congregation_id: string; boundary: unknown; bounds?: LngLatBoundsLike };
