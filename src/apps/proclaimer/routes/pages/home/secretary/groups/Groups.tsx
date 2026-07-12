import { GroupsHeader } from "@proclaimer-content/pages/home/secretary/groups/groups-header/GroupsHeader";
import { GroupsContent } from "@proclaimer-content/pages/home/secretary/groups/groups-content/GroupsContent";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

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
