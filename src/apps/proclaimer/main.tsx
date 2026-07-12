import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@util/vendor/ionic/helper/ionic-init";
import "@ui/css/index.css";
import { initTheme } from "@util/app/theme/utils";
import { initFontSize } from "@util/app/font-size/utils";
import { QueryProvider } from "@util/vendor/react-query";
import { PwaUpdateToast } from "@util/app/pwa/PwaUpdateToast";
import App from "@proclaimer-routes/App";
import { runMigration } from "@util/app/migration/migrate";

initTheme();
initFontSize();

// Run migration from previous app version
const migrationResult = runMigration();
if (migrationResult.congregationMigrated || migrationResult.publisherMigrated) {
  console.log("Migration completed:", migrationResult);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <IonApp>
        <IonReactRouter>
          <App />
        </IonReactRouter>
        <PwaUpdateToast />
      </IonApp>
    </QueryProvider>
  </StrictMode>,
);
