import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ProfileHeader } from "@proclaimer-content/pages/settings/profile/profile-header/ProfileHeader";
import { ProfileContent } from "@proclaimer-content/pages/settings/profile/profile-content/ProfileContent";

function ProfilePage() {
  return (
    <IonPage>
      <IonHeader>
        <ProfileHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ProfileContent />
      </IonContent>
    </IonPage>
  );
}

export default ProfilePage;
