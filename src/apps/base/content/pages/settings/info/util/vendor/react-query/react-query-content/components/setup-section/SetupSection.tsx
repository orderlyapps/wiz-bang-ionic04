import { IonAccordion, IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";

const setupCode = `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "@util/vendor/react-query";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
);`;

export function SetupSection() {
  return (
    <IonAccordion value="setup">
      <IonItem slot="header">
        <IonLabel>Setup</IonLabel>
      </IonItem>
      <div className="ion-padding" slot="content">
        <IonItem lines="none">
          <Body>
            Wrap your application with <code>QueryProvider</code> in your main entry file:
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
            {setupCode}
          </pre>
        </IonItem>
      </div>
    </IonAccordion>
  );
}
