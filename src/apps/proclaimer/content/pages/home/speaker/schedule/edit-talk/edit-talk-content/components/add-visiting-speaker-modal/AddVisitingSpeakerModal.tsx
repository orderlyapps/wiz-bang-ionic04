import { useState } from "react";
import { IonAlert, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Select } from "@ui/components/inputs/select/Select";
import { PublisherNameInput } from "@proclaimer-shared/publisher/components/publisher-name-input/PublisherNameInput";
import { congregationCollection } from "@shared/database/collections/congregation";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Congregation } from "@shared/database/schemas/congregation";
import type { NameValue } from "@ui/components/inputs/name/NameInput";

const ADD_NEW_CONGREGATION_VALUE = "add_new";

interface AddVisitingSpeakerModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  on_speaker_created?: (publisher_id: string) => void;
}

export function AddVisitingSpeakerModal({
  is_open,
  on_dismiss,
  on_speaker_created,
}: AddVisitingSpeakerModalProps) {
  const [selected_congregation_id, set_selected_congregation_id] = useState<string | null>(null);
  const [is_add_congregation_alert_open, set_is_add_congregation_alert_open] = useState(false);
  const [new_publisher_name, set_new_publisher_name] = useState<NameValue>({
    first_name: "",
    middle_name: null,
    last_name: "",
    display_name: null,
  });
  const congregation = useStoredCongregation();
  const current_congregation_id = congregation?.id ?? "";

  const { data: all_congregations } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).orderBy(({ c }) => c.name),
  );

  const congregations = ((all_congregations as Congregation[] | undefined) ?? []).filter(
    (c) => c.id !== current_congregation_id,
  );

  function handleDismiss() {
    set_selected_congregation_id(null);
    set_is_add_congregation_alert_open(false);
    set_new_publisher_name({
      first_name: "",
      middle_name: null,
      last_name: "",
      display_name: null,
    });
    on_dismiss();
  }

  function handleSelectCongregation(value: string | string[] | null) {
    const selected = (value as string) || null;
    if (selected === ADD_NEW_CONGREGATION_VALUE) {
      set_is_add_congregation_alert_open(true);
      return;
    }
    set_selected_congregation_id(selected);
  }

  async function handleAddCongregation(data: { text: string }) {
    const name = data.text.trim();
    if (!name || !current_congregation_id) return;
    const new_congregation_id = crypto.randomUUID();
    const tx = congregationCollection.insert({
      id: new_congregation_id,
      name,
      congregation_id: current_congregation_id,
    });
    await tx.isPersisted.promise;
    set_selected_congregation_id(new_congregation_id);
  }

  async function handleCreatePublisher(name: NameValue) {
    if (!selected_congregation_id || !name.first_name.trim() || !name.last_name.trim()) return;
    const new_publisher_id = crypto.randomUUID();
    const tx = publisherCollection.insert({
      id: new_publisher_id,
      congregation_id: selected_congregation_id,
      first_name: name.first_name,
      middle_name: name.middle_name,
      last_name: name.last_name,
      display_name: name.display_name,
      gender: "male",
      standing: "associate",
      type: "speaker",
    });
    await tx.isPersisted.promise;
    set_new_publisher_name(name);
    on_speaker_created?.(new_publisher_id);
    handleDismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Visiting Speaker</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={handleDismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Select
          label="Congregation"
          value={selected_congregation_id}
          placeholder="Select Congregation"
          options={[
            ...congregations.map((congregation) => ({
              value: congregation.id ?? "",
              label: congregation.name,
            })),
            { value: ADD_NEW_CONGREGATION_VALUE, label: "Add New..." },
          ]}
          on_change={handleSelectCongregation}
        />
        {selected_congregation_id && (
          <PublisherNameInput value={new_publisher_name} on_change={handleCreatePublisher} />
        )}
      </IonContent>
      <IonAlert
        isOpen={is_add_congregation_alert_open}
        header="Add New Congregation"
        inputs={[
          {
            name: "text",
            type: "text",
            placeholder: "Congregation name",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: async (data) => {
              await handleAddCongregation(data as { text: string });
            },
          },
        ]}
        onDidDismiss={() => set_is_add_congregation_alert_open(false)}
      />
    </ResponsiveModal>
  );
}
