import { IonItem } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { ModuleSection } from "@base-content/pages/settings/info/util/vendor/ionic/ionic-content/components/shared/module-section/ModuleSection";

const items = [{ label: "IonicColor.ts", value: "Type definition for all Ionic color tokens." }];

const code = `export type IonicColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "medium"
  | "dark";`;

export function TypesSection() {
  return (
    <ModuleSection
      title="Types"
      path="src/util/vendor/ionic/types/"
      description="Contains TypeScript type definitions for Ionic-specific types."
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
