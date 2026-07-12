import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";

const items = [
  { label: "mapboxToken", value: "Reads VITE_MAPBOX_TOKEN from the environment." },
  {
    label: "MapView",
    value: "Interactive map. Props: id, initialViewState, initialStyleId, styleId, height, style.",
  },
  {
    label: "MapStyleSelect",
    value: "Controlled dropdown. Light/Dark pairs shown as one entry. Props: value, on_change.",
  },
  {
    label: "selectableStyles",
    value: "Collapsed style list where light/dark pairs appear as a single selectable entry.",
  },
  {
    label: "resolveMapStyle(styleId, resolved_theme)",
    value: "Returns the correct Mapbox style URL based on the selected style and current theme.",
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

const code = `import { MapView } from "@util/vendor/mapbox/MapView";
import { MapStyleSelect } from "@util/vendor/mapbox/MapStyleSelect";
import { useMapState } from "@util/vendor/mapbox/useMapState";

const INITIAL_VIEW = { longitude: 144.9631, latitude: -37.8136, zoom: 10 };

function MyMap() {
  // Pass an id to persist location + style per map instance.
  // Omit id to share a single persisted state across all unnamed maps.
  const { styleId, setStyleId } = useMapState(INITIAL_VIEW, "streets-v12", "my-map");

  return (
    <>
      <MapStyleSelect value={styleId} on_change={setStyleId} />
      <MapView
        id="my-map"
        initialViewState={INITIAL_VIEW}
        styleId={styleId}
        height={400}
      />
    </>
  );
}`;

export function UsageSection() {
  return (
    <ModuleSection
      title="Usage"
      path="src/util/vendor/mapbox/"
      description="Add your Mapbox token to .env.local then drop MapView anywhere a map is needed."
      items={items}
    >
      <IonItem>
        <Body>
          <strong>Example</strong>
        </Body>
      </IonItem>
      <IonItem lines="none">
        <pre
          style={{
            margin: 0,
            width: "100%",
            whiteSpace: "pre-wrap",
            fontSize: "0.8125rem",
          }}
        >
          {code}
        </pre>
      </IonItem>
    </ModuleSection>
  );
}
