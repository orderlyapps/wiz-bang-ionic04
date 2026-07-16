import {
  IonContent,
  IonList,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import { useState } from "react";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Body } from "@ui/components/display/text/body/Body";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

interface AddPublishersModalProps {
  is_open: boolean;
  group_id: string;
  publishers: Publisher[];
  on_dismiss: () => void;
}

export function AddPublishersModal({
  is_open,
  group_id,
  publishers,
  on_dismiss,
}: AddPublishersModalProps) {
  const [search, set_search] = useState("");
  const [show_all, set_show_all] = useState(false);

  const query = search.trim().toLowerCase();

  const visible = publishers
    .filter((p) => (show_all ? true : !p.group_id))
    .filter((p) => {
      if (!query) return true;
      const name = getPublisherDisplayName(p).toLowerCase();
      return name.includes(query);
    });

  function handleDismiss() {
    set_search("");
    set_show_all(false);
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Publishers</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <SearchInput value={search} placeholder="Search publishers..." on_change={set_search} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TextButton
          fill="clear"
          on_click={() => set_show_all((v) => !v)}
          label={show_all ? "Show Unassigned" : "Show All"}
        />

        <IonList>
          {visible.length === 0 ? (
            <div className="ion-padding ion-text-center">
              <Body color="medium">No publishers available to add.</Body>
            </div>
          ) : (
            <MultiColumnList
              items={visible}
              get_id={(p) => p.id ?? ""}
              gap="sm"
              render_item={(p) => (
                <IonItem
                  onClick={() => {
                    publisherCollection.update(p.id ?? "", (draft) => {
                      draft.group_id = group_id;
                    });
                    handleDismiss();
                  }}
                >
                  {getPublisherDisplayName(p)}
                </IonItem>
              )}
            />
          )}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
