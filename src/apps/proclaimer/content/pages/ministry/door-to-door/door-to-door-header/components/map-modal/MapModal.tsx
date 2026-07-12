import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonItem,
  IonSearchbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { filterOutline } from "ionicons/icons";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MapList } from "./components/MapList";
import { MyMapsList } from "./components/MyMapsList";
import { RecentMapsList } from "./components/RecentMapsList";
import { MapImagePreview } from "./components/map-image-preview/MapImagePreview";
import { MapFilterModal } from "./components/map-filter-modal/MapFilterModal";
import { useRecentMaps } from "./hooks/useRecentMaps";
import { useMinistryMapPresets } from "./hooks/useMinistryMapPresets";
import type { MapRow } from "@shared/database/schemas/map";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  onMapSelect?: (map: MapWithBoundary) => void;
}

export function MapModal({ is_open, on_dismiss, onMapSelect }: MapModalProps) {
  const { recentMaps, addToRecentMaps } = useRecentMaps();
  const presets_api = useMinistryMapPresets();
  const [preview_url, set_preview_url] = useState<string | null>(null);
  const [search_query, set_search_query] = useState("");
  const [show_filters, set_show_filters] = useState(false);
  const has_active_filters = presets_api.has_active_filters;

  function handleMapSelect(map: MapWithBoundary) {
    // Persist the selected map to recent maps
    addToRecentMaps(map);
    onMapSelect?.(map);
    on_dismiss();
  }

  return (
    <>
      <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Maps</IonTitle>
            <IonButtons slot="end">
              <IonButton
                fill="clear"
                color={has_active_filters ? "primary" : "medium"}
                onClick={() => set_show_filters(true)}
              >
                <IonIcon slot="icon-only" icon={filterOutline} />
              </IonButton>
              <CloseIconButton on_click={on_dismiss} skip_confirmation />
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              value={search_query}
              onIonInput={(e) => set_search_query(e.detail.value ?? "")}
              debounce={100}
              placeholder="Search maps..."
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {search_query.trim() === "" && (
            <>
              <MyMapsList onMapSelect={handleMapSelect} onPreviewImage={set_preview_url} />

              <Space />

              <RecentMapsList
                recentMapIds={recentMaps.map((m) => m.id)}
                onMapSelect={handleMapSelect}
                onPreviewImage={set_preview_url}
              />

              <Space />
            </>
          )}

          <IonItem>
            <Heading>All Maps</Heading>
          </IonItem>
          <MapList
            onMapSelect={handleMapSelect}
            onPreviewImage={set_preview_url}
            search_query={search_query}
            filter={presets_api.active_preset.filter}
            sort_order={presets_api.active_preset.sort_order}
          />
        </IonContent>
      </ResponsiveModal>
      <MapFilterModal
        is_open={show_filters}
        on_dismiss={() => set_show_filters(false)}
        presets={presets_api.presets}
        active_preset={presets_api.active_preset}
        is_default_active={presets_api.is_default_active}
        on_select_preset={presets_api.selectPreset}
        on_create_preset={presets_api.createPreset}
        on_rename_preset={presets_api.renamePreset}
        on_delete_preset={presets_api.deletePreset}
        on_change={presets_api.updatePreset}
      />
      {preview_url && (
        <MapImagePreview url={preview_url} on_dismiss={() => set_preview_url(null)} />
      )}
    </>
  );
}
