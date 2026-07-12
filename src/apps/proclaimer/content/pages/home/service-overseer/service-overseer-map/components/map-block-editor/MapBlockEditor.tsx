import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import type { IControl } from "mapbox-gl";
import { ensureClosedRing } from "../../utils/boundary";
import { MAP_DRAW_STYLES } from "../../utils/drawStyles";
import type { Block } from "../../utils/types";

type Props = {
  block: Block;
  onPendingChange: (block: Block | null) => void;
};

function toFeature(block: Block): GeoJSON.Feature | null {
  if (block.type === "block") {
    const ring = ensureClosedRing(block.coordinates as number[][]);
    return {
      type: "Feature",
      id: "editing-block",
      geometry: { type: "Polygon", coordinates: [ring] },
      properties: {},
    };
  }
  if (block.coordinates.length < 2) return null;
  return {
    type: "Feature",
    id: "editing-block",
    geometry: { type: "LineString", coordinates: block.coordinates as GeoJSON.Position[] },
    properties: {},
  };
}

function toBlockCoordinates(block: Block, feature: GeoJSON.Feature): [number, number][] | null {
  const geometry = feature.geometry;
  if (!geometry) return null;
  if (block.type === "block") {
    if (geometry.type !== "Polygon") return null;
    const ring = geometry.coordinates[0];
    if (!ring) return null;
    return ring as [number, number][];
  }
  if (geometry.type !== "LineString") return null;
  return geometry.coordinates as [number, number][];
}

export function MapBlockEditor({ block, onPendingChange }: Props) {
  const { current: map } = useMap();
  const onPendingChangeRef = useRef(onPendingChange);
  onPendingChangeRef.current = onPendingChange;
  const blockRef = useRef(block);
  blockRef.current = block;

  useEffect(() => {
    if (!map) return;

    const is_new = blockRef.current.coordinates.length === 0;
    const feature = is_new ? null : toFeature(blockRef.current);
    if (!is_new && !feature) return;

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { trash: true },
      styles: MAP_DRAW_STYLES,
    });

    let added = false;
    let listeners_attached = false;
    let feature_id: string | null = null;

    function handleUpdate(e: { features: GeoJSON.Feature[] }) {
      const updated = e.features[0];
      if (!updated) return;
      const coordinates = toBlockCoordinates(blockRef.current, updated);
      if (!coordinates) return;
      onPendingChangeRef.current({ ...blockRef.current, coordinates });
    }

    function handleCreate(e: { features: GeoJSON.Feature[] }) {
      const created = e.features[0];
      if (!created) return;
      feature_id = String(created.id ?? null);
      const coordinates = toBlockCoordinates(blockRef.current, created);
      if (!coordinates) return;
      onPendingChangeRef.current({ ...blockRef.current, coordinates });
      if (feature_id) {
        try {
          draw.changeMode("direct_select", { featureId: feature_id });
        } catch {
          // ignore
        }
      }
    }

    function handleDelete(e: { features: GeoJSON.Feature[] }) {
      const deleted = e.features[0];
      if (!deleted || deleted.id !== feature_id) return;
      try {
        const feature = toFeature(blockRef.current);
        if (!feature) return;
        const addedIds = draw.add(feature);
        feature_id = addedIds[0] ?? null;
        if (feature_id) {
          draw.changeMode("direct_select", { featureId: feature_id });
        }
      } catch {
        // ignore
      }
    }

    try {
      map.addControl(draw as unknown as IControl);
      added = true;

      if (feature) {
        const addedIds = draw.add(feature);
        feature_id = addedIds[0] ?? null;
        if (feature_id) {
          draw.changeMode("direct_select", { featureId: feature_id });
        }
      } else if (blockRef.current.type === "block") {
        draw.changeMode("draw_polygon");
      } else {
        draw.changeMode("draw_line_string");
      }

      map.on("draw.update", handleUpdate);
      map.on("draw.create", handleCreate);
      map.on("draw.delete", handleDelete);
      listeners_attached = true;
    } catch {
      if (listeners_attached) {
        map.off("draw.update", handleUpdate);
        map.off("draw.create", handleCreate);
        map.off("draw.delete", handleDelete);
      }
      if (added) {
        map.removeControl(draw as unknown as IControl);
      }
      return;
    }

    return () => {
      map.off("draw.update", handleUpdate);
      map.off("draw.create", handleCreate);
      map.off("draw.delete", handleDelete);
      map.removeControl(draw as unknown as IControl);
    };
  }, [map, block.id]);

  return null;
}
