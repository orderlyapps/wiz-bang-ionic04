import { z } from "zod";
import type { StyleSpecification } from "mapbox-gl";

export const customLocalStyleSettingsSchema = z.object({
  road_width_multiplier: z.coerce.number().min(0.5).max(3),
  road_label_size_multiplier: z.coerce.number().min(0.5).max(3),
});

export type CustomLocalStyleSettings = z.infer<typeof customLocalStyleSettingsSchema>;

export const DEFAULT_CUSTOM_LOCAL_STYLE_SETTINGS: CustomLocalStyleSettings = {
  road_width_multiplier: 1,
  road_label_size_multiplier: 1,
};

function isRoadLineLayer(layer: Record<string, unknown>): boolean {
  return (
    layer.type === "line" &&
    layer["source-layer"] === "road" &&
    layer.paint != null &&
    (layer.paint as Record<string, unknown>)["line-width"] != null
  );
}

function isRoadLabelLayer(layer: Record<string, unknown>): boolean {
  const sourceLayer = layer["source-layer"] as string | undefined;
  return (
    layer.type === "symbol" &&
    (sourceLayer === "road" || sourceLayer === "motorway_junction") &&
    layer.layout != null &&
    (layer.layout as Record<string, unknown>)["text-size"] != null
  );
}

function multiplyExpressionOutputs(expression: unknown, multiplier: number): unknown {
  if (typeof expression === "number") {
    return expression * multiplier;
  }

  if (!Array.isArray(expression)) {
    return expression;
  }

  const operator = expression[0];

  if (operator === "interpolate") {
    const result = [...expression];
    // interpolate format: ["interpolate", interpolation, input, input1, output1, input2, output2, ...]
    for (let i = 4; i < result.length; i += 2) {
      result[i] = multiplyExpressionOutputs(result[i], multiplier);
    }
    return result;
  }

  if (operator === "step") {
    const result = [...expression];
    // step format: ["step", input, defaultOutput, input1, output1, input2, output2, ...]
    result[2] = multiplyExpressionOutputs(result[2], multiplier);
    for (let i = 4; i < result.length; i += 2) {
      result[i] = multiplyExpressionOutputs(result[i], multiplier);
    }
    return result;
  }

  return expression;
}

export function applyCustomLocalStyleOverrides(
  style: StyleSpecification,
  settings: CustomLocalStyleSettings,
): StyleSpecification {
  const modified = JSON.parse(JSON.stringify(style)) as Record<string, unknown>;
  const layers = modified.layers as Array<Record<string, unknown>>;

  for (const layer of layers) {
    if (isRoadLineLayer(layer)) {
      const paint = layer.paint as Record<string, unknown>;
      paint["line-width"] = multiplyExpressionOutputs(
        paint["line-width"],
        settings.road_width_multiplier,
      );
    }

    if (isRoadLabelLayer(layer)) {
      const layout = layer.layout as Record<string, unknown>;
      layout["text-size"] = multiplyExpressionOutputs(
        layout["text-size"],
        settings.road_label_size_multiplier,
      );
    }
  }

  return modified as StyleSpecification;
}
