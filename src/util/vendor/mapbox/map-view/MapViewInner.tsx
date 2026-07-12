import { useEffect, useRef, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl/mapbox";
import mapboxgl, { type LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxToken } from "@util/vendor/mapbox/mapboxToken";
import { useMapLocation } from "@util/vendor/mapbox/useMapLocation";
import { resolveMapStyle, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import { useTheme } from "@util/app/theme";
import type { ViewState } from "react-map-gl/mapbox";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import { applyCustomLocalStyleOverrides } from "@util/vendor/mapbox/customLocalStyleSettings";
import type { StyleSpecification } from "mapbox-gl";

mapboxgl.workerCount = 1;
mapboxgl.maxParallelImageRequests = 6;
mapboxgl.prewarm();

type Props = {
  id?: string;
  initialViewState?: Partial<ViewState>;
  initialStyleId?: SelectableStyleId;
  styleId?: SelectableStyleId;
  height?: string | number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  customLocalStyleSettings?: CustomLocalStyleSettings;
  on_press?: (lngLat: LngLat, features: mapboxgl.GeoJSONFeature[]) => void;
  on_long_press?: (lngLat: LngLat, features: mapboxgl.GeoJSONFeature[]) => void;
};

export function MapViewInner({
  id,
  initialViewState = { longitude: 134, latitude: -25, zoom: 3.5 },
  initialStyleId = "custom",
  styleId: controlledStyleId,
  height = "100%",
  style,
  children,
  customLocalStyleSettings,
  on_press,
  on_long_press,
}: Props) {
  const [map_loaded, set_map_loaded] = useState(false);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const long_press_timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const long_press_point = useRef<{ x: number; y: number } | null>(null);
  const on_long_press_ref = useRef(on_long_press);
  on_long_press_ref.current = on_long_press;
  const on_press_ref = useRef(on_press);
  on_press_ref.current = on_press;

  function getMapPointAndFeatures(clientX: number, clientY: number) {
    const map = mapRef.current!;
    const canvas = map.getCanvas();
    const rect = canvas.getBoundingClientRect();
    const point = new mapboxgl.Point(clientX - rect.left, clientY - rect.top);
    return { lngLat: map.unproject(point), features: map.queryRenderedFeatures(point) };
  }

  const LONG_PRESS_MOVE_THRESHOLD = 8;

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!mapRef.current) return;
    long_press_point.current = { x: e.clientX, y: e.clientY };
    if (on_long_press_ref.current) {
      long_press_timer.current = setTimeout(() => {
        if (!mapRef.current || !long_press_point.current) return;
        long_press_point.current = null;
        const { lngLat, features } = getMapPointAndFeatures(e.clientX, e.clientY);
        on_long_press_ref.current!(lngLat, features);
      }, 500);
    }
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (long_press_timer.current) {
      clearTimeout(long_press_timer.current);
      long_press_timer.current = null;
    }
    if (on_press_ref.current && mapRef.current && long_press_point.current) {
      const { lngLat, features } = getMapPointAndFeatures(e.clientX, e.clientY);
      on_press_ref.current(lngLat, features);
    }
    long_press_point.current = null;
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!long_press_point.current) return;
    const dx = e.clientX - long_press_point.current.x;
    const dy = e.clientY - long_press_point.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > LONG_PRESS_MOVE_THRESHOLD) {
      if (long_press_timer.current) {
        clearTimeout(long_press_timer.current);
        long_press_timer.current = null;
      }
      long_press_point.current = null;
    }
  }

  function cancelLongPress() {
    if (long_press_timer.current) {
      clearTimeout(long_press_timer.current);
      long_press_timer.current = null;
    }
    long_press_point.current = null;
  }
  const { resolved_theme } = useTheme();
  const {
    viewState,
    styleId: internalStyleId,
    onMove,
  } = useMapLocation(initialViewState, initialStyleId, id);
  const styleId = controlledStyleId ?? internalStyleId;
  const baseMapStyle = resolveMapStyle(styleId, resolved_theme);
  const [resolvedStyle, setResolvedStyle] = useState<string | StyleSpecification>(baseMapStyle);
  const originalStyleRef = useRef<StyleSpecification | null>(null);

  useEffect(() => {
    if (styleId !== "custom-local" || !customLocalStyleSettings) {
      originalStyleRef.current = null;
      setResolvedStyle(baseMapStyle);
      return;
    }

    if (originalStyleRef.current) {
      setResolvedStyle(
        applyCustomLocalStyleOverrides(originalStyleRef.current, customLocalStyleSettings),
      );
      return;
    }

    let cancelled = false;
    const url = `${import.meta.env.BASE_URL}mapbox/custom-local-light.json`;
    fetch(url)
      .then((res) => res.json())
      .then((style: StyleSpecification) => {
        if (cancelled) return;
        originalStyleRef.current = style;
        setResolvedStyle(applyCustomLocalStyleOverrides(style, customLocalStyleSettings));
      })
      .catch(() => {
        if (cancelled) return;
        setResolvedStyle(baseMapStyle);
      });

    return () => {
      cancelled = true;
    };
  }, [baseMapStyle, customLocalStyleSettings, styleId]);

  return (
    <div
      style={{
        width: "100%",
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerCancel={cancelLongPress}
    >
      <Map
        {...viewState}
        onMove={onMove}
        onLoad={() => set_map_loaded(true)}
        ref={(ref) => {
          mapRef.current = ref?.getMap() ?? null;
        }}
        mapboxAccessToken={mapboxToken}
        style={{ width: "100%", height: "100%" }}
        mapStyle={resolvedStyle}
        reuseMaps
        fadeDuration={0}
        maxPitch={60}
      >
        <GeolocateControl
          position="top-right"
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={true}
          fitBoundsOptions={{ zoom: 17 }}
        />
        {map_loaded ? children : null}
      </Map>
    </div>
  );
}

export default MapViewInner;
