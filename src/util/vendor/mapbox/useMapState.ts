import { useMapLocation } from "@util/vendor/mapbox/useMapLocation";
import {
  resolveMapStyle,
  type SelectableStyleId,
  type StyleSpecification,
} from "@util/vendor/mapbox/mapboxStyles";
import { useTheme } from "@util/app/theme";
import type { ViewState } from "react-map-gl/mapbox";

type UseMapStateResult = ReturnType<typeof useMapLocation> & {
  mapStyle: string | StyleSpecification;
};

export function useMapState(
  initialViewState: Partial<ViewState>,
  initialStyleId: SelectableStyleId,
  id?: string,
): UseMapStateResult {
  const { resolved_theme } = useTheme();
  const location = useMapLocation(initialViewState, initialStyleId, id);
  const mapStyle = resolveMapStyle(location.styleId, resolved_theme);
  return { ...location, mapStyle };
}
