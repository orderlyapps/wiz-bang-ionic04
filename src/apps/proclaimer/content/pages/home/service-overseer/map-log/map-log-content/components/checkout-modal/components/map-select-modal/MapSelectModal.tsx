import { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";
import type { MapRow } from "@shared/database/schemas/map";

interface MapSelectModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (map: MapRow) => void;
  selectedId?: string;
  maps: MapRow[];
  subtitle?: string;
}

export function MapSelectModal({
  isOpen,
  onDismiss,
  onSelect,
  selectedId,
  maps,
  subtitle,
}: MapSelectModalProps) {
  const [query, set_query] = useState("");

  const filtered = maps.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  function handleSelect(map: MapRow) {
    onSelect(map);
    set_query("");
    onDismiss();
  }

  function handleDismiss() {
    set_query("");
    onDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Select Map
            {subtitle && <p style={{ fontSize: "0.8em", margin: 0 }}>{subtitle}</p>}
          </IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <SearchInput value={query} placeholder="Search maps..." on_change={set_query} />
        {filtered.length === 0 ? (
          <IonList inset>
            <IonItem>
              <IonLabel>No maps found.</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <IonList inset>
            {filtered.map((m) => (
              <IonItem key={m.id} button detail={false} onClick={() => handleSelect(m)}>
                <IonLabel>{m.name}</IonLabel>
                {selectedId === m.id && <IonIcon icon={checkmark} slot="end" color="primary" />}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
