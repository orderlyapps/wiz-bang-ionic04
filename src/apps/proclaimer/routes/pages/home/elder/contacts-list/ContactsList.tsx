import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ContactsListHeader } from "@proclaimer-content/pages/home/elder/contacts-list/contacts-list-header/ContactsListHeader";
import { ContactsListContent } from "@proclaimer-content/pages/home/elder/contacts-list/contacts-list-content/ContactsListContent";

function ContactsListPage() {
  return (
    <IonPage>
      <IonHeader>
        <ContactsListHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <ContactsListContent />
      </IonContent>
    </IonPage>
  );
}

export default ContactsListPage;
