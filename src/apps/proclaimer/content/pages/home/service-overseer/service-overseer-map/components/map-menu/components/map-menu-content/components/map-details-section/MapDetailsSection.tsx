import { AlertTextInput } from "@ui/components/inputs/alert-text/AlertTextInput";
import { Space } from "@ui/components/layout/space/Space";
import type { SelectedMap } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";
import { MapTagSelect } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-menu/components/map-tag-select/MapTagSelect";

type Props = {
  selectedMap: Extract<SelectedMap, { type: "map" }>;
  onUpdateMap: (name: string, details: string, url: string) => void;
};

export function MapDetailsSection({ selectedMap, onUpdateMap }: Props) {
  return (
    <>
      <AlertTextInput
        label="Name"
        value={selectedMap.name}
        on_change={(name) => onUpdateMap(name, selectedMap.details ?? "", selectedMap.url ?? "")}
      />
      <AlertTextInput
        label="Details"
        value={selectedMap.details ?? ""}
        placeholder="Add details..."
        on_change={(details) => onUpdateMap(selectedMap.name, details, selectedMap.url ?? "")}
      />
      <AlertTextInput
        label="URL"
        value={selectedMap.url ?? ""}
        placeholder="Add URL..."
        on_change={(url) => onUpdateMap(selectedMap.name, selectedMap.details ?? "", url)}
      />
      <MapTagSelect map_id={selectedMap.id} />
      <Space />
    </>
  );
}
