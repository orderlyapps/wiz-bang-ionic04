import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { AssignmentsHeader } from "@proclaimer-content/pages/home/assignments/assignments-header/AssignmentsHeader";
import { AssignmentsContent } from "@proclaimer-content/pages/home/assignments/assignments-content/AssignmentsContent";

function AssignmentsPage() {
  return (
    <IonPage>
      <IonHeader>
        <AssignmentsHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <AssignmentsContent />
      </IonContent>
    </IonPage>
  );
}

export default AssignmentsPage;
