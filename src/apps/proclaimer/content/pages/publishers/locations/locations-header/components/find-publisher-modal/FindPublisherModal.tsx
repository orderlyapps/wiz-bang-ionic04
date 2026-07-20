import { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Select } from "@ui/components/inputs/select/Select";
import {
  usePublishersWithCoordinates,
  type PublisherWithCoordinates,
} from "../../hooks/usePublishersWithCoordinates";
import { useCongregationGroups } from "../../hooks/useCongregationGroups";
import { Space } from "@ui/components/layout/space/Space";

type FindPublisherModalProps = {
  is_open: boolean;
  selected_group_id: string;
  on_group_change: (group_id: string) => void;
  on_dismiss: () => void;
  on_select: (publisher: PublisherWithCoordinates) => void;
};

export function FindPublisherModal({
  is_open,
  selected_group_id,
  on_group_change,
  on_dismiss,
  on_select,
}: FindPublisherModalProps) {
  const publishers = usePublishersWithCoordinates();
  const { groups } = useCongregationGroups();
  const [search, setSearch] = useState("");

  const group_options = [
    { label: "All Groups", value: "all" },
    ...groups.map((g) => ({ label: g.name, value: g.id ?? "" })),
  ];

  const filtered = (publishers ?? []).filter((p) => {
    if (selected_group_id !== "all" && p.group_id !== selected_group_id) return false;
    return p.display_name.toLowerCase().includes(search.toLowerCase());
  });

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
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
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
        <Select
          label="Group"
          value={selected_group_id}
          options={group_options}
          interface_type="popover"
          on_change={(value) => {
            if (Array.isArray(value)) return;
            on_group_change(value ?? "all");
          }}
        />

        <Space />

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
