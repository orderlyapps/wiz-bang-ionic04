import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";
import { MapView } from "@util/vendor/mapbox/MapView";
import { MapStyleSelect } from "@util/vendor/mapbox/MapStyleSelect";
import { useMapState } from "@util/vendor/mapbox/useMapState";
import { Space } from "@ui/components/layout/space/Space";

const EXAMPLE_MAP_ID = "example";
const INITIAL_VIEW = { longitude: 144.9631, latitude: -37.8136, zoom: 10 };

const items = [
  {
    label: "MapView",
    value: "Interactive map. Props: id, initialViewState, initialStyleId, styleId, height, style.",
  },
  { label: "MapStyleSelect", value: "Dropdown to switch between all built-in Mapbox styles." },
  {
    label: "selectableStyles",
    value: "Collapsed style list — light/dark pairs appear as a single entry.",
  },
  {
    label: "resolveMapStyle",
    value: "Returns the correct style URL for a given selection and resolved theme.",
  },
  {
    label: "useMapLocation",
    value: "Hook that manages view state and style selection with localStorage persistence.",
  },
  {
    label: "useMapState",
    value:
      "Combines useMapLocation + resolveMapStyle. Returns viewState, styleId, setStyleId, onMove, mapStyle.",
  },
];

export function ExampleSection() {
  const { styleId, setStyleId } = useMapState(INITIAL_VIEW, "custom", EXAMPLE_MAP_ID);

  return (
    <ModuleSection
      title="Example"
      path="src/util/vendor/mapbox/"
      description="A live MapView with an interactive style switcher. Location and style are persisted."
      items={items}
    >
      <MapStyleSelect value={styleId} on_change={setStyleId} />
      <Space size="sm" />
      <MapView id={EXAMPLE_MAP_ID} initialViewState={INITIAL_VIEW} styleId={styleId} height={300} />
    </ModuleSection>
  );
}
