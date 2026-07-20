import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { FindPublisherModal } from "./components/find-publisher-modal/FindPublisherModal";
import type { PublisherWithCoordinates } from "./hooks/usePublishersWithCoordinates";

type LocationsHeaderProps = {
  selected_group_id: string;
  on_group_change: (group_id: string) => void;
  on_select_publisher: (publisher: PublisherWithCoordinates) => void;
};

export function LocationsHeader({
  selected_group_id,
  on_group_change,
  on_select_publisher,
}: LocationsHeaderProps) {
  const [show_modal, set_show_modal] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>Locations</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => set_show_modal(true)}>
            <IonIcon slot="icon-only" icon={searchOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <FindPublisherModal
        is_open={show_modal}
        selected_group_id={selected_group_id}
        on_group_change={on_group_change}
        on_dismiss={() => set_show_modal(false)}
        on_select={(publisher) => {
          set_show_modal(false);
          on_select_publisher(publisher);
        }}
      />
    </>
  );
}
