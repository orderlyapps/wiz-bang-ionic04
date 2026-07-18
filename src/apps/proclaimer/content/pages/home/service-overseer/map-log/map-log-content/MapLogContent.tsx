import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { Body } from "@ui/components/display/text/body/Body";
import { MapLogFilterButton } from "./components/map-log-filter-button/MapLogFilterButton";
import { useMapLogPresets } from "./components/use-map-log-presets/useMapLogPresets";
import { useFilteredMapLogMaps } from "./components/use-filtered-map-log-maps/useFilteredMapLogMaps";

interface MapLogContentProps {
  search_term?: string;
}

export function MapLogContent({ search_term = "" }: MapLogContentProps) {
  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps.filter((m) => m.congregation_id === congregation_id);

  const presets_api = useMapLogPresets();
  const { maps: filtered_maps, last_activity_by_map_id } = useFilteredMapLogMaps(
    congregation_maps,
    presets_api.active_preset.filter,
    presets_api.active_preset.sort_order,
  );

  const search_filtered_maps = search_term.trim()
    ? filtered_maps.filter((map) => {
        const q = search_term.toLowerCase();
        return map.name.toLowerCase().includes(q) || (map.details ?? "").toLowerCase().includes(q);
      })
    : filtered_maps;

  function weeksSinceActivity(map_id: string | undefined): string | undefined {
    if (!map_id) return undefined;
    const activity = last_activity_by_map_id.get(map_id);
    if (!activity) return undefined;
    const diff_ms = Date.now() - new Date(activity).getTime();
    const weeks = Math.floor(diff_ms / (1000 * 60 * 60 * 24 * 7));
    if (weeks <= 0) return "This week";
    if (weeks === 1) return "Last week";
    if (weeks > 26) {
      const months = Math.floor(weeks / 4.345);
      if (months === 1) return "1 mo";
      return `${months}mo`;
    }
    return `${weeks}w`;
  }

  return (
    <>
      <MapLogFilterButton
        presets={presets_api.presets}
        active_preset={presets_api.active_preset}
        is_default_active={presets_api.is_default_active}
        on_select_preset={presets_api.selectPreset}
        on_create_preset={presets_api.createPreset}
        on_rename_preset={presets_api.renamePreset}
        on_delete_preset={presets_api.deletePreset}
        on_change={presets_api.updatePreset}
      />
      <IonItem className="ion-text-center" lines="none">
        <IonLabel>
          <Body size="sm" color="medium" style={{ padding: "0 16px 4px" }}>
            Showing {search_filtered_maps.length} of {congregation_maps.length}
          </Body>
        </IonLabel>
      </IonItem>
      <IonList>
        {search_filtered_maps.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>{congregation_maps.length === 0 ? "No maps yet." : "No maps match filters."}</p>
            </IonLabel>
          </IonItem>
        )}
        {search_filtered_maps.map((map) => (
          <NavItem
            key={map.id}
            to={`/home/service-overseer/map-log/${map.id}`}
            label={map.name}
            stat={
              presets_api.active_preset.filter.checkout_filter !== "any"
                ? weeksSinceActivity(map.id)
                : undefined
            }
          />
        ))}
      </IonList>
    </>
  );
}
