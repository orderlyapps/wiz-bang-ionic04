import { AuthContent } from "@base-content/pages/settings/info/util/app/auth/auth-content/AuthContent";
import { AuthHeader } from "@base-content/pages/settings/info/util/app/auth/auth-header/AuthHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function AuthPage() {
  return (
    <IonPage>
      <IonHeader>
        <AuthHeader />
      </IonHeader>
      <IonContent>
        <AuthContent />
      </IonContent>
    </IonPage>
  );
}

export default AuthPage;
