import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { SettingsHeader } from "@proclaimer-content/pages/settings/settings-header/SettingsHeader";
import { SettingsContent } from "@proclaimer-content/pages/settings/settings-content/SettingsContent";

function SettingsPage() {
  return (
    <IonPage>
      <IonHeader>
        <SettingsHeader />
      </IonHeader>
      <IonContent>
        <SettingsContent />
      </IonContent>
    </IonPage>
  );
}

export default SettingsPage;
