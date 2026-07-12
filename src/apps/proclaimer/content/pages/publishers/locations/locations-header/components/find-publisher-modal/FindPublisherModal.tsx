import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import {
  usePublishersWithCoordinates,
  type PublisherWithCoordinates,
} from "../../hooks/usePublishersWithCoordinates";

type FindPublisherModalProps = {
  is_open: boolean;
  on_dismiss: () => void;
  on_select: (publisher: PublisherWithCoordinates) => void;
};

export function FindPublisherModal({ is_open, on_dismiss, on_select }: FindPublisherModalProps) {
  const publishers = usePublishersWithCoordinates();
  const [search, setSearch] = useState("");

  const filtered = (publishers ?? []).filter((p) =>
    p.display_name.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSelect(publisher: PublisherWithCoordinates) {
    setSearch("");
    on_select(publisher);
  }

  function handleDismiss() {
    setSearch("");
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Find Publisher</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? "")}
            placeholder="Search publishers..."
            debounce={0}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {filtered.map((publisher) => (
            <IonItem key={publisher.publisher_id} button onClick={() => handleSelect(publisher)}>
              <IonLabel>{publisher.display_name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
