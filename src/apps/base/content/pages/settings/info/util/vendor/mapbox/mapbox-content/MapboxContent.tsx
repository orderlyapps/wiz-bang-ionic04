import { IonAccordionGroup, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { UsageSection } from "@base-content/pages/settings/info/util/vendor/mapbox/mapbox-content/components/usage-section/UsageSection";
import { ExampleSection } from "@base-content/pages/settings/info/util/vendor/mapbox/mapbox-content/components/example-section/ExampleSection";

export function MapboxContent() {
  return (
    <>
      <IonItem lines="none">
        <IonLabel>
          <Body>
            The <code>src/util/vendor/mapbox</code> module provides <code>MapView</code> — an
            interactive map component built on top of <code>react-map-gl</code> and{" "}
            <code>mapbox-gl</code>. Set <code>VITE_MAPBOX_TOKEN</code> in <code>.env.local</code> to
            enable the map.
          </Body>
        </IonLabel>
      </IonItem>

      <Space size="md" />

      <IonAccordionGroup>
        <UsageSection />
        <ExampleSection />
      </IonAccordionGroup>
    </>
  );
}
