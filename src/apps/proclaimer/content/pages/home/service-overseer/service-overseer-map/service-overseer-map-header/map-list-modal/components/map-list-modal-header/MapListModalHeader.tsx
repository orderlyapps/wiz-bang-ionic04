import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { filterOutline } from "ionicons/icons";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";

type MapListModalHeaderProps = {
  search_query: string;
  on_search_change: (value: string) => void;
  has_active_filters: boolean;
  on_close: () => void;
  on_show_filters: () => void;
  on_add: () => void;
};

export function MapListModalHeader({
  search_query,
  on_search_change,
  has_active_filters,
  on_close,
  on_show_filters,
  on_add,
}: MapListModalHeaderProps) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <CloseIconButton on_click={on_close} skip_confirmation />
        </IonButtons>
        <IonTitle>Maps</IonTitle>
        <IonButtons slot="end">
          <IonButton
            fill="clear"
            color={has_active_filters ? "primary" : "medium"}
            onClick={on_show_filters}
          >
            <IonIcon slot="icon-only" icon={filterOutline} />
          </IonButton>
          <AddIconButton on_click={on_add} />
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <IonSearchbar
          value={search_query}
          onIonInput={(e) => on_search_change(e.detail.value ?? "")}
          debounce={100}
          placeholder="Search maps..."
        />
      </IonToolbar>
    </IonHeader>
  );
}
