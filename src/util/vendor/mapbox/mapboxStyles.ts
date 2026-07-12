import type { StyleSpecification } from "mapbox-gl";

export type { StyleSpecification };

export type MapboxStyleId =
  | "streets-v12"
  | "outdoors-v12"
  | "light-v11"
  | "dark-v11"
  | "satellite-v9"
  | "satellite-streets-v12"
  | "navigation-day-v1"
  | "navigation-night-v1";

export type MapboxStyle = {
  id: MapboxStyleId;
  label: string;
  url: string;
  theme_pair?: { light: MapboxStyleId; dark: MapboxStyleId };
};

export type SelectableStyleId =
  | "custom"
  | "custom-local"
  | "streets-v12"
  | "outdoors-v12"
  | "light-dark"
  | "satellite-v9"
  | "satellite-streets-v12"
  | "navigation";

export type SelectableStyle = {
  id: SelectableStyleId;
  label: string;
  light_url: string | StyleSpecification;
  dark_url: string | StyleSpecification;
};

export const mapboxStyles: MapboxStyle[] = [
  { id: "streets-v12", label: "Streets", url: "mapbox://styles/mapbox/streets-v12" },
  { id: "outdoors-v12", label: "Outdoors", url: "mapbox://styles/mapbox/outdoors-v12" },
  {
    id: "light-v11",
    label: "Light",
    url: "mapbox://styles/mapbox/light-v11",
    theme_pair: { light: "light-v11", dark: "dark-v11" },
  },
  {
    id: "dark-v11",
    label: "Dark",
    url: "mapbox://styles/mapbox/dark-v11",
    theme_pair: { light: "light-v11", dark: "dark-v11" },
  },
  { id: "satellite-v9", label: "Satellite", url: "mapbox://styles/mapbox/satellite-v9" },
  {
    id: "satellite-streets-v12",
    label: "Satellite Streets",
    url: "mapbox://styles/mapbox/satellite-streets-v12",
  },
  {
    id: "navigation-day-v1",
    label: "Navigation Day",
    url: "mapbox://styles/mapbox/navigation-day-v1",
    theme_pair: { light: "navigation-day-v1", dark: "navigation-night-v1" },
  },
  {
    id: "navigation-night-v1",
    label: "Navigation Night",
    url: "mapbox://styles/mapbox/navigation-night-v1",
    theme_pair: { light: "navigation-day-v1", dark: "navigation-night-v1" },
  },
];

export const selectableStyles: SelectableStyle[] = [
  {
    id: "custom",
    label: "Proclaimer",
    light_url: "mapbox://styles/damianamodeo/cmdpsma8m001101srez71g8d0",
    dark_url: "mapbox://styles/damianamodeo/cmel2s3td005z01si07d9b3wb",
  },
  {
    id: "custom-local",
    label: "Custom",
    light_url: `${import.meta.env.BASE_URL}mapbox/custom-local-light.json`,
    dark_url: "mapbox://styles/damianamodeo/cmel2s3td005z01si07d9b3wb",
  },
  {
    id: "streets-v12",
    label: "Streets",
    light_url: "mapbox://styles/mapbox/streets-v12",
    dark_url: "mapbox://styles/mapbox/streets-v12",
  },
  {
    id: "outdoors-v12",
    label: "Outdoors",
    light_url: "mapbox://styles/mapbox/outdoors-v12",
    dark_url: "mapbox://styles/mapbox/outdoors-v12",
  },
  {
    id: "light-dark",
    label: "Light / Dark",
    light_url: "mapbox://styles/mapbox/light-v11",
    dark_url: "mapbox://styles/mapbox/dark-v11",
  },
  {
    id: "satellite-v9",
    label: "Satellite",
    light_url: "mapbox://styles/mapbox/satellite-v9",
    dark_url: "mapbox://styles/mapbox/satellite-v9",
  },
  {
    id: "satellite-streets-v12",
    label: "Satellite Streets",
    light_url: "mapbox://styles/mapbox/satellite-streets-v12",
    dark_url: "mapbox://styles/mapbox/satellite-streets-v12",
  },
  {
    id: "navigation",
    label: "Navigation",
    light_url: "mapbox://styles/mapbox/navigation-day-v1",
    dark_url: "mapbox://styles/mapbox/navigation-night-v1",
  },
];

export function resolveMapStyle(
  styleId: SelectableStyleId,
  resolved_theme: "light" | "dark",
): string | StyleSpecification {
  const style = selectableStyles.find((s) => s.id === styleId) ?? selectableStyles[0];
  return resolved_theme === "dark" ? style.dark_url : style.light_url;
}
