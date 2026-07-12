import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { GroupsHeader } from "@proclaimer-content/pages/publishers/groups/groups-header/GroupsHeader";
import { GroupsContent } from "@proclaimer-content/pages/publishers/groups/groups-content/GroupsContent";

function GroupsPage() {
  return (
    <IonPage>
      <IonHeader>
        <GroupsHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <GroupsContent />
      </IonContent>
    </IonPage>
  );
}

export default GroupsPage;
