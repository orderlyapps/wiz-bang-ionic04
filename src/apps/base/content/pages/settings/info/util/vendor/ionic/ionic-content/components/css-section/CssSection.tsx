import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";

const items = [
  { label: "index.css", value: "Main entry point that imports all CSS modules." },
  { label: "text-size.css", value: "Font size scale variables used by useFontSize." },
  {
    label: "responsive.css",
    value:
      "Responsive content container. Caps ion-content at --content-max-width and centers it. Per-page modifiers: .content-wide, .content-full.",
  },
  { label: "safe-area.css", value: "Safe area insets for notched devices." },
  {
    label: "desktop.css",
    value:
      "Desktop affordances: focus rings on buttons/items and hover backgrounds gated by (hover: hover) and (pointer: fine) so mobile is unaffected.",
  },
  { label: "overrides/content.css", value: "Custom ion-content padding overrides." },
  { label: "overrides/input.css", value: "Custom ion-input flex behavior." },
  { label: "overrides/modal.css", value: "Date picker modal styling." },
];

const code = `@import "./text-size.css";
@import "./responsive.css";
@import "./safe-area.css";
@import "./desktop.css";

@import "./overrides/content.css";
@import "./overrides/input.css";
@import "./overrides/modal.css";`;

export function CssSection() {
  return (
    <ModuleSection
      title="CSS"
      path="src/util/vendor/ionic/css/"
      description="Contains Ionic CSS customizations and overrides for the application."
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
