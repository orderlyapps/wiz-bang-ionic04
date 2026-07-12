import { useState } from "react";
import { IonModal } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useMapLogPresets } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-map-log-presets/useMapLogPresets";
import { useFilteredMapLogMaps } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-filtered-map-log-maps/useFilteredMapLogMaps";
import { MapListFilterModal } from "./components/map-list-filter-modal/MapListFilterModal";
import { MapListModalHeader } from "./components/map-list-modal-header/MapListModalHeader";
import { MapListModalContent } from "./components/map-list-modal-content/MapListModalContent";
import { MapListModalAlerts } from "./components/map-list-modal-alerts/MapListModalAlerts";
import { boundaryToBounds } from "../../utils/boundary";
import { getRecentMapIds, recordRecentMap } from "../../utils/useRecentMaps";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapMaster } from "@shared/database/schemas/map-master";
import type { SelectedMap } from "../../utils/types";

type MapListModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (selection: SelectedMap) => void;
  onImportKml: (geojson: GeoJSON.FeatureCollection) => void;
};

export function MapListModal({ isOpen, onDidDismiss, onSelect, onImportKml }: MapListModalProps) {
  const [show_add_alert, set_show_add_alert] = useState(false);
  const [show_add_action_sheet, set_show_add_action_sheet] = useState(false);
  const [show_error_alert, set_show_error_alert] = useState(false);
  const [search_query, set_search_query] = useState("");
  const [show_filters, set_show_filters] = useState(false);
  const presets_api = useMapLogPresets(
    localStorageKeys.soMapListFilterSortPresets,
    localStorageKeys.soMapListFilterSortActivePreset,
  );

  const { data: maps } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: masters } = useLiveQuery((q) => q.from({ mm: mapMasterCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const congregation_maps = maps?.filter((map) => map.congregation_id === congregation_id) ?? [];
  const { maps: filtered_maps, checked_out_name_by_map_id } = useFilteredMapLogMaps(
    congregation_maps,
    presets_api.active_preset.filter,
    presets_api.active_preset.sort_order,
  );
  const has_active_filters = presets_api.has_active_filters;

  const search_filtered_maps = search_query.trim()
    ? filtered_maps.filter((map) => {
        const q = search_query.toLowerCase();
        const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
        return (
          map.name.toLowerCase().includes(q) ||
          (map.details ?? "").toLowerCase().includes(q) ||
          checked_out_name.toLowerCase().includes(q)
        );
      })
    : filtered_maps;
  const recent_ids = getRecentMapIds();
  const recent_maps = recent_ids
    .map((id) => congregation_maps.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m != null);
  const filtered_masters = masters?.filter((master) => master.congregation_id === congregation_id);
  const master = filtered_masters?.[0];

  function handleSelectMap(map: MapRow) {
    if (!map.id) return;
    recordRecentMap(map.id);
    onSelect({
      type: "map",
      id: map.id,
      name: map.name,
      details: map.details,
      url: map.url,
      boundary: map.boundary,
      bounds: boundaryToBounds(map.boundary) ?? undefined,
      blocks: map.blocks,
    });
    onDidDismiss();
  }

  function handleSelectMaster(master: MapMaster) {
    onSelect({
      type: "master",
      congregation_id: master.congregation_id,
      boundary: master.boundary,
      bounds: boundaryToBounds(master.boundary) ?? undefined,
    });
    onDidDismiss();
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <MapListModalHeader
        search_query={search_query}
        on_search_change={set_search_query}
        has_active_filters={has_active_filters}
        on_close={onDidDismiss}
        on_show_filters={() => set_show_filters(true)}
        on_add={() => set_show_add_action_sheet(true)}
      />
      <MapListModalContent
        search_query={search_query}
        recent_maps={recent_maps}
        congregation_maps={congregation_maps}
        search_filtered_maps={search_filtered_maps}
        active_preset_name={presets_api.active_preset.name}
        master={master}
        checked_out_name_by_map_id={checked_out_name_by_map_id}
        on_select_map={handleSelectMap}
        on_select_master={handleSelectMaster}
      />
      <MapListFilterModal
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
      <MapListModalAlerts
        show_add_alert={show_add_alert}
        set_show_add_alert={set_show_add_alert}
        show_add_action_sheet={show_add_action_sheet}
        set_show_add_action_sheet={set_show_add_action_sheet}
        show_error_alert={show_error_alert}
        set_show_error_alert={set_show_error_alert}
        congregation_id={congregation_id}
        on_select={onSelect}
        on_did_dismiss={onDidDismiss}
        on_import_kml={onImportKml}
      />
    </IonModal>
  );
}
