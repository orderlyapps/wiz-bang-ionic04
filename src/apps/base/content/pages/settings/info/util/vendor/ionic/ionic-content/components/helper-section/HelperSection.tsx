import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";

const items = [{ label: "ionic-init.ts", value: "Initializes Ionic React with core CSS imports." }];

const code = `import { setupIonicReact } from "@ionic/react";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.class.css";

setupIonicReact();`;

export function HelperSection() {
  return (
    <ModuleSection
      title="Helper"
      path="src/util/vendor/ionic/helper/"
      description="Contains initialization and setup utilities for Ionic React."
      items={items}
    >
      <IonItem>
        <Body>
          <strong>Source</strong>
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
