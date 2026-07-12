import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { BulkEntryHeader } from "@proclaimer-content/pages/home/service-overseer/map-log/bulk-entry/bulk-entry-header/BulkEntryHeader";
import { BulkEntryContent } from "@proclaimer-content/pages/home/service-overseer/map-log/bulk-entry/bulk-entry-content/BulkEntryContent";

function BulkEntryPage() {
  return (
    <IonPage>
      <IonHeader>
        <BulkEntryHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <BulkEntryContent />
      </IonContent>
    </IonPage>
  );
}

export default BulkEntryPage;
