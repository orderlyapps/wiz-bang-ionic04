import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublishersHeader } from "@proclaimer-content/pages/home/secretary/publishers/publishers-header/PublishersHeader";
import { PublishersContent } from "@proclaimer-content/pages/home/secretary/publishers/publishers-content/PublishersContent";
import { AddPublisherAlert } from "@proclaimer-content/pages/home/secretary/publishers/publishers-header/components/add-publisher-alert/AddPublisherAlert";
import { useState } from "react";

function PublishersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [is_add_modal_open, set_is_add_modal_open] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <PublishersHeader
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          on_add={() => set_is_add_modal_open(true)}
        />
      </IonHeader>
      <IonContent className="content-wide">
        <PublishersContent searchTerm={searchTerm} />
      </IonContent>
      <AddPublisherAlert
        is_open={is_add_modal_open}
        on_dismiss={() => set_is_add_modal_open(false)}
      />
    </IonPage>
  );
}

export default PublishersPage;
