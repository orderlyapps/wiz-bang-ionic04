import { useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { VisitingSpeakersHeader } from "@proclaimer-content/pages/home/speaker/visiting-speakers/visiting-speakers-header/VisitingSpeakersHeader";
import { VisitingSpeakersContent } from "@proclaimer-content/pages/home/speaker/visiting-speakers/visiting-speakers-content/VisitingSpeakersContent";

function VisitingSpeakersPage() {
  const [search, setSearch] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <VisitingSpeakersHeader search={search} on_search_change={setSearch} />
      </IonHeader>
      <IonContent className="ion-padding">
        <VisitingSpeakersContent search={search} />
      </IonContent>
    </IonPage>
  );
}

export default VisitingSpeakersPage;
