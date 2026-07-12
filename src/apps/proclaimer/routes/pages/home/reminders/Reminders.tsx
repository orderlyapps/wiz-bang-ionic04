import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { RemindersHeader } from "@proclaimer-content/pages/home/reminders/reminders-header/RemindersHeader";
import { RemindersContent } from "@proclaimer-content/pages/home/reminders/reminders-content/RemindersContent";

function RemindersPage() {
  return (
    <IonPage>
      <IonHeader>
        <RemindersHeader />
      </IonHeader>
      <IonContent>
        <RemindersContent />
      </IonContent>
    </IonPage>
  );
}

export default RemindersPage;
