import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function SettingsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NavItem label="Appearance" to="/settings/appearance" />
      </IonContent>
    </IonPage>
  );
}

export default SettingsPage;
