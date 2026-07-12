import { ThemeContent } from "@base-content/pages/settings/info/util/app/theme/theme-content/ThemeContent";
import { ThemeHeader } from "@base-content/pages/settings/info/util/app/theme/theme-header/ThemeHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ThemePage() {
  return (
    <IonPage>
      <IonHeader>
        <ThemeHeader />
      </IonHeader>
      <IonContent>
        <ThemeContent />
      </IonContent>
    </IonPage>
  );
}

export default ThemePage;
