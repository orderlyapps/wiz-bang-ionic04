import { IonContent } from "@ionic/react";
import { MapStyleSelect } from "@util/vendor/mapbox/MapStyleSelect";
import { Space } from "@ui/components/layout/space/Space";
import type { SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";
import type { ScreenshotSettings } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import { ScreenshotSettingsSection } from "./components/screenshot-settings-section/ScreenshotSettingsSection";
import { MapDetailsSection } from "./components/map-details-section/MapDetailsSection";
import { MapActionsSection } from "./components/map-actions-section/MapActionsSection";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

type Props = {
  styleId: SelectableStyleId;
  onStyleIdChange: (styleId: SelectableStyleId) => void;
  screenshotMode: boolean;
  is_map: boolean;
  customLocalStyleSettings: CustomLocalStyleSettings;
  onCustomLocalStyleSettingsChange: (settings: CustomLocalStyleSettings) => void;
  screenshotSettings: ScreenshotSettings;
  onScreenshotSettingsChange: (settings: ScreenshotSettings) => void;
  selectedMap: SelectedMap | null;
  onUpdateMap: (name: string, details: string, url: string) => void;
  hasPendingChanges: boolean;
  onSave: () => void;
  onEditBoundary: () => void;
  onDeleteMap: () => void;
  blocks: Block[] | null;
  onRenameBlock: (blockId: string, name: string) => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
};

export function MapMenuContent({
  styleId,
  onStyleIdChange,
  screenshotMode,
  is_map,
  customLocalStyleSettings,
  onCustomLocalStyleSettingsChange,
  screenshotSettings,
  onScreenshotSettingsChange,
  selectedMap,
  onUpdateMap,
  hasPendingChanges,
  onSave,
  onEditBoundary,
  onDeleteMap,
  blocks,
  onRenameBlock,
  onEditBlock,
  onDeleteBlock,
}: Props) {
  return (
    <IonContent className="content-wide">
      {hasPendingChanges && (
        <>
          <TextButton label="Save Changes" disabled={!hasPendingChanges} on_click={onSave} />
          <Space />
        </>
      )}

      <MapStyleSelect value={styleId} on_change={onStyleIdChange} />

      {screenshotMode && is_map && (
        <ScreenshotSettingsSection
          styleId={styleId}
          customLocalStyleSettings={customLocalStyleSettings}
          onCustomLocalStyleSettingsChange={onCustomLocalStyleSettingsChange}
          screenshotSettings={screenshotSettings}
          onScreenshotSettingsChange={onScreenshotSettingsChange}
        />
      )}

      {!screenshotMode && is_map && selectedMap?.type === "map" && (
        <MapDetailsSection selectedMap={selectedMap} onUpdateMap={onUpdateMap} />
      )}

      {!screenshotMode && (
        <MapActionsSection
          is_map={is_map}
          hasPendingChanges={hasPendingChanges}
          onEditBoundary={onEditBoundary}
          onDeleteMap={onDeleteMap}
          blocks={blocks}
          onRenameBlock={onRenameBlock}
          onEditBlock={onEditBlock}
          onDeleteBlock={onDeleteBlock}
        />
      )}

      <Space />
    </IonContent>
  );
}
