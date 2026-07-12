import { useState, useRef } from "react";
import { IonMenu } from "@ionic/react";
import { AddBlockFlow } from "./components/add-block-flow/AddBlockFlow";
import { MapMenuHeader } from "./components/map-menu-header/MapMenuHeader";
import { MapMenuContent } from "./components/map-menu-content/MapMenuContent";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";
import type { ScreenshotSettings } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import type { SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

type Props = {
  hasPendingChanges: boolean;
  onSave: () => void;
  selectedMap: SelectedMap | null;
  onDeselect: () => void;
  onEditBoundary: () => void;
  onUpdateMap: (name: string, details: string, url: string) => void;
  onDeleteMap: () => void;
  onRenameBlock: (blockId: string, name: string) => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (type: "block" | "face", name: string) => void;
  screenshotMode: boolean;
  screenshotSettings: ScreenshotSettings;
  onScreenshotSettingsChange: (settings: ScreenshotSettings) => void;
  onToggleScreenshot: () => void;
  styleId: SelectableStyleId;
  onStyleIdChange: (styleId: SelectableStyleId) => void;
  customLocalStyleSettings: CustomLocalStyleSettings;
  onCustomLocalStyleSettingsChange: (settings: CustomLocalStyleSettings) => void;
};

function MapMenu({
  hasPendingChanges,
  onSave,
  selectedMap,
  onDeselect,
  onEditBoundary,
  onUpdateMap,
  onDeleteMap,
  onRenameBlock,
  onEditBlock,
  onDeleteBlock,
  onAddBlock,
  screenshotMode,
  screenshotSettings,
  onScreenshotSettingsChange,
  onToggleScreenshot,
  styleId,
  onStyleIdChange,
  customLocalStyleSettings,
  onCustomLocalStyleSettingsChange,
}: Props) {
  const menu_ref = useRef<HTMLIonMenuElement>(null);
  const [show_add_flow, set_show_add_flow] = useState(false);
  const blocks = selectedMap?.type === "map" ? selectedMap.blocks : null;
  const can_add = selectedMap?.type === "map";
  const is_map = selectedMap?.type === "map";

  function closeMenu() {
    void menu_ref.current?.close();
  }

  return (
    <IonMenu ref={menu_ref} side="end" contentId="map-content">
      <MapMenuHeader
        is_map={is_map}
        screenshotMode={screenshotMode}
        can_add={can_add}
        hasPendingChanges={hasPendingChanges}
        onToggleScreenshot={() => {
          onToggleScreenshot();
          if (!screenshotMode) closeMenu();
        }}
        onAddClick={() => set_show_add_flow(true)}
        onCloseMenu={closeMenu}
        onDeselect={onDeselect}
      />
      <AddBlockFlow
        is_open={show_add_flow}
        on_dismiss={() => set_show_add_flow(false)}
        on_add={(type, name) => {
          onAddBlock(type, name);
          set_show_add_flow(false);
          closeMenu();
        }}
      />
      <MapMenuContent
        styleId={styleId}
        onStyleIdChange={onStyleIdChange}
        screenshotMode={screenshotMode}
        is_map={is_map}
        customLocalStyleSettings={customLocalStyleSettings}
        onCustomLocalStyleSettingsChange={onCustomLocalStyleSettingsChange}
        screenshotSettings={screenshotSettings}
        onScreenshotSettingsChange={onScreenshotSettingsChange}
        selectedMap={selectedMap}
        onUpdateMap={onUpdateMap}
        hasPendingChanges={hasPendingChanges}
        onSave={onSave}
        onEditBoundary={onEditBoundary}
        onDeleteMap={onDeleteMap}
        blocks={blocks}
        onRenameBlock={onRenameBlock}
        onEditBlock={onEditBlock}
        onDeleteBlock={onDeleteBlock}
      />
    </IonMenu>
  );
}

export default MapMenu;
