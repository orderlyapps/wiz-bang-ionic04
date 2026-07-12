import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useState } from "react";
import { AllPublishersHeader } from "@proclaimer-content/pages/publishers/all-publishers/all-publishers-header/AllPublishersHeader";
import { AllPublishersContent } from "@proclaimer-content/pages/publishers/all-publishers/all-publishers-content/AllPublishersContent";

function AllPublishersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <AllPublishersHeader searchTerm={searchTerm} onSearch={setSearchTerm} />
      </IonHeader>
      <IonContent className="content-wide">
        <AllPublishersContent searchTerm={searchTerm} />
      </IonContent>
    </IonPage>
  );
}

export default AllPublishersPage;
