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
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { Publisher } from "@shared/database/schemas/publisher";

const MAX_RECENT_PUBLISHERS = 15;

function getRecentPublisherIds(): string[] {
  try {
    const raw = localStorage.getItem(localStorageKeys.recentMapPublishers);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function addRecentPublisherId(id: string) {
  const current = getRecentPublisherIds().filter((existing) => existing !== id);
  current.unshift(id);
  const trimmed = current.slice(0, MAX_RECENT_PUBLISHERS);
  localStorage.setItem(localStorageKeys.recentMapPublishers, JSON.stringify(trimmed));
}

interface PublisherSelectModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (publisher: Publisher) => void;
  selectedId?: string;
}

export function PublisherSelectModal({
  isOpen,
  onDismiss,
  onSelect,
  selectedId,
}: PublisherSelectModalProps) {
  const [query, set_query] = useState("");
  const [show_recent_only, set_show_recent_only] = useState(false);
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const publishers = ((data as Publisher[] | undefined) ?? []).filter(
    (p) => p.congregation_id === congregation_id,
  );

  const recent_ids = getRecentPublisherIds();
  const recent_id_set = new Set(recent_ids);

  const filtered = publishers
    .filter((p) => getPublisherDisplayName(p).toLowerCase().includes(query.toLowerCase()))
    .filter((p) => p.id && (!show_recent_only || recent_id_set.has(p.id)))
    .sort((a, b) => getPublisherDisplayName(a).localeCompare(getPublisherDisplayName(b)));

  function handleSelect(publisher: Publisher) {
    if (publisher.id) addRecentPublisherId(publisher.id);
    onSelect(publisher);
    set_query("");
    onDismiss();
  }

  function handleDismiss() {
    set_query("");
    set_show_recent_only(false);
    onDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Publisher</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <SearchInput value={query} placeholder="Search publishers..." on_change={set_query} />
        <IonList inset>
          <IonItem>
            <IonLabel>Recent only</IonLabel>
            <IonToggle
              checked={show_recent_only}
              onIonChange={(e) => set_show_recent_only(e.detail.checked)}
              disabled={recent_ids.length === 0}
            />
          </IonItem>
        </IonList>
        {filtered.length === 0 ? (
          <IonList inset>
            <IonItem>
              <IonLabel>No publishers found.</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <IonList inset>
            {filtered.map((p) => (
              <IonItem key={p.id} button detail={false} onClick={() => handleSelect(p)}>
                <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
                {selectedId === p.id && <IonIcon icon={checkmark} slot="end" color="primary" />}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
