import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { GroupsHeader } from "@proclaimer-content/pages/home/elder/pdfs/groups/groups-header/GroupsHeader";
import { GroupsContent } from "@proclaimer-content/pages/home/elder/pdfs/groups/groups-content/GroupsContent";

function GroupsPage() {
  return (
    <IonPage>
      <IonHeader>
        <GroupsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <GroupsContent />
      </IonContent>
    </IonPage>
  );
}

export default GroupsPage;
