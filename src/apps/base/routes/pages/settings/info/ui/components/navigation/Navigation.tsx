import { NavigationContent } from "@base-content/pages/settings/info/ui/components/navigation/navigation-content/NavigationContent";
import { NavigationHeader } from "@base-content/pages/settings/info/ui/components/navigation/navigation-header/NavigationHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function NavigationPage() {
  return (
    <IonPage>
      <IonHeader>
        <NavigationHeader />
      </IonHeader>
      <IonContent>
        <NavigationContent />
      </IonContent>
    </IonPage>
  );
}

export default NavigationPage;
