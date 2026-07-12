import { useEffect, useRef, useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerMapHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader";
import { ServiceOverseerMapContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent";
import MapMenu from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-menu/MapMenu";
import type { FitBoundsFn } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";
import { useMapPage } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/useMapPage";
import {
  type ScreenshotSettings,
  DEFAULT_SCREENSHOT_SETTINGS,
  screenshotSettingsSchema,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import {
  type CustomLocalStyleSettings,
  DEFAULT_CUSTOM_LOCAL_STYLE_SETTINGS,
  customLocalStyleSettingsSchema,
} from "@util/vendor/mapbox/customLocalStyleSettings";
import { localStorageKeys, localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import { selectableStyles, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { mapCollection } from "@shared/database/collections/map";
import { boundaryToBounds } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/boundary";

const SERVICE_OVERSEER_MAP_STYLE_KEY = localStorageKeyWithVariant("mapStyle", "service-overseer");

function isSelectableStyleId(value: string): value is SelectableStyleId {
  return selectableStyles.some((s) => s.id === value);
}

function ServiceOverseerMapPage() {
  const fitBoundsRef = useRef<FitBoundsFn | null>(null);
  const save_settings_timeout_ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const save_style_timeout_ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const save_custom_local_style_timeout_ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [style_id, set_style_id] = useState<SelectableStyleId>(() => {
    try {
      const stored = localStorage.getItem(SERVICE_OVERSEER_MAP_STYLE_KEY);
      if (stored && isSelectableStyleId(stored)) {
        return stored;
      }
    } catch {
      /* ignore */
    }
    return "custom-local";
  });
  const [screenshot_settings, set_screenshot_settings] = useState<ScreenshotSettings>(() => {
    try {
      const stored = localStorage.getItem(localStorageKeys.screenshotSettings);
      if (stored) {
        return screenshotSettingsSchema.parse({
          ...DEFAULT_SCREENSHOT_SETTINGS,
          ...(JSON.parse(stored) as Record<string, unknown>),
        });
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_SCREENSHOT_SETTINGS;
  });
  const [custom_local_style_settings, set_custom_local_style_settings] =
    useState<CustomLocalStyleSettings>(() => {
      try {
        const stored = localStorage.getItem(localStorageKeys.customLocalStyleSettings);
        if (stored) {
          return customLocalStyleSettingsSchema.parse({
            ...DEFAULT_CUSTOM_LOCAL_STYLE_SETTINGS,
            ...(JSON.parse(stored) as Record<string, unknown>),
          });
        }
      } catch {
        /* ignore */
      }
      return DEFAULT_CUSTOM_LOCAL_STYLE_SETTINGS;
    });
  const [kml_geojson, set_kml_geojson] = useState<GeoJSON.FeatureCollection | null>(null);
  const congregation = useStoredCongregation();

  function handleScreenshotSettingsChange(settings: ScreenshotSettings) {
    set_screenshot_settings(settings);
    if (save_settings_timeout_ref.current) clearTimeout(save_settings_timeout_ref.current);
    save_settings_timeout_ref.current = setTimeout(() => {
      try {
        localStorage.setItem(localStorageKeys.screenshotSettings, JSON.stringify(settings));
      } catch {
        /* ignore */
      }
    }, 500);
  }

  function handleStyleIdChange(nextStyleId: SelectableStyleId) {
    set_style_id(nextStyleId);
    if (save_style_timeout_ref.current) clearTimeout(save_style_timeout_ref.current);
    save_style_timeout_ref.current = setTimeout(() => {
      try {
        localStorage.setItem(SERVICE_OVERSEER_MAP_STYLE_KEY, nextStyleId);
      } catch {
        /* ignore */
      }
    }, 500);
  }

  function handleCustomLocalStyleSettingsChange(settings: CustomLocalStyleSettings) {
    set_custom_local_style_settings(settings);
    if (save_custom_local_style_timeout_ref.current)
      clearTimeout(save_custom_local_style_timeout_ref.current);
    save_custom_local_style_timeout_ref.current = setTimeout(() => {
      try {
        localStorage.setItem(localStorageKeys.customLocalStyleSettings, JSON.stringify(settings));
      } catch {
        /* ignore */
      }
    }, 500);
  }

  useEffect(() => {
    return () => {
      if (save_settings_timeout_ref.current) clearTimeout(save_settings_timeout_ref.current);
      if (save_style_timeout_ref.current) clearTimeout(save_style_timeout_ref.current);
      if (save_custom_local_style_timeout_ref.current)
        clearTimeout(save_custom_local_style_timeout_ref.current);
    };
  }, []);

  const {
    selected_map,
    selected_block,
    has_pending_changes,
    handleSelect,
    handleDeselect,
    handlePendingChange,
    handleBlockPendingChange,
    screenshot_mode,
    handleToggleScreenshot,
    handleEditBoundary,
    handleRenameBlock,
    handleUpdateMap,
    handleEditBlock,
    handleDeleteBlock,
    handleDeleteMap,
    handleAddBlock,
    handleSave,
  } = useMapPage((bounds) => bounds && fitBoundsRef.current?.(bounds));

  function handleCreateMapFromBoundary(name: string, boundary: number[][]) {
    const congregation_id = congregation?.id;
    if (!congregation_id) return;
    const bounds = boundaryToBounds(boundary);
    if (!bounds) return;
    const id = crypto.randomUUID();
    mapCollection.insert({
      id,
      congregation_id,
      name,
      boundary: boundary as [number, number][],
      blocks: null,
    });
    set_kml_geojson(null);
    handleSelect({
      type: "map",
      id,
      name,
      details: null,
      url: null,
      boundary,
      bounds,
      blocks: null,
    });
  }

  return (
    <>
      <MapMenu
        hasPendingChanges={has_pending_changes}
        onSave={handleSave}
        selectedMap={selected_map}
        onDeselect={handleDeselect}
        screenshotMode={screenshot_mode}
        screenshotSettings={screenshot_settings}
        onScreenshotSettingsChange={handleScreenshotSettingsChange}
        onToggleScreenshot={handleToggleScreenshot}
        onEditBoundary={handleEditBoundary}
        onUpdateMap={handleUpdateMap}
        onRenameBlock={handleRenameBlock}
        onDeleteMap={handleDeleteMap}
        onEditBlock={handleEditBlock}
        onDeleteBlock={handleDeleteBlock}
        onAddBlock={handleAddBlock}
        styleId={style_id}
        onStyleIdChange={handleStyleIdChange}
        customLocalStyleSettings={custom_local_style_settings}
        onCustomLocalStyleSettingsChange={handleCustomLocalStyleSettingsChange}
      />
      <IonPage id="map-content">
        <IonHeader>
          <ServiceOverseerMapHeader
            onSelect={handleSelect}
            onImportKml={set_kml_geojson}
            selected_map={selected_map}
          />
        </IonHeader>
        <IonContent className="content-full" scrollY={false}>
          <ServiceOverseerMapContent
            fitBoundsRef={fitBoundsRef}
            selectedMap={selected_map}
            selectedBlock={selected_block}
            screenshotMode={screenshot_mode}
            screenshotSettings={screenshot_settings}
            onPendingChange={handlePendingChange}
            onBlockPendingChange={handleBlockPendingChange}
            styleId={style_id}
            customLocalStyleSettings={custom_local_style_settings}
            kmlGeoJson={kml_geojson}
            onCreateMapFromBoundary={handleCreateMapFromBoundary}
          />
        </IonContent>
      </IonPage>
    </>
  );
}

export default ServiceOverseerMapPage;
