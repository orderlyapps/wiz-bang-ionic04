import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AuthUsersHeader } from "@proclaimer-content/pages/home/congregation-admin/auth-users/auth-users-header/AuthUsersHeader";
import { AuthUsersContent } from "@proclaimer-content/pages/home/congregation-admin/auth-users/auth-users-content/AuthUsersContent";

function AuthUsersPage() {
  return (
    <IonPage>
      <IonHeader>
        <AuthUsersHeader />
      </IonHeader>
      <IonContent>
        <AuthUsersContent />
      </IonContent>
    </IonPage>
  );
}

export default AuthUsersPage;
