import { useState } from "react";
import { IonItem, IonList } from "@ionic/react";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { MapSelectModal } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/checkout-modal/components/map-select-modal/MapSelectModal";
import type { MapRow } from "@shared/database/schemas/map";

interface UnmatchedMapsProps {
  unmatched_names: string[];
  maps: MapRow[];
  resolutions: Record<string, string>;
  on_resolve: (name: string, map_id: string) => void;
}

export function UnmatchedMaps({
  unmatched_names,
  maps,
  resolutions,
  on_resolve,
}: UnmatchedMapsProps) {
  const [active_name, set_active_name] = useState<string | null>(null);

  function handleSelect(map: MapRow) {
    if (active_name && map.id) {
      on_resolve(active_name, map.id);
    }
    set_active_name(null);
  }

  if (unmatched_names.length === 0) return null;

  const sorted_maps = [...maps]
    .filter((m) => !Object.values(resolutions).includes(m.id ?? ""))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Body>These map names were not found. Assign each to an existing map:</Body>
      <Space size="sm" />
      <IonList inset>
        {unmatched_names.map((name) => (
          <IonItem key={name}>
            <ModalSelect
              label={name}
              display_value={
                resolutions[name]
                  ? (sorted_maps.find((m) => m.id === resolutions[name])?.name ?? "")
                  : ""
              }
              placeholder="Select a map..."
              on_open={() => set_active_name(name)}
            />
          </IonItem>
        ))}
      </IonList>
      <MapSelectModal
        isOpen={active_name !== null}
        onDismiss={() => set_active_name(null)}
        onSelect={handleSelect}
        maps={sorted_maps}
        subtitle={active_name ? `Validating: ${active_name}` : undefined}
      />
    </>
  );
}
