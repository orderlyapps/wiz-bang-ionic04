import { useState } from "react";
import { IonItem, IonLabel, IonList, IonSkeletonText } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Body } from "@ui/components/display/text/body/Body";
import { Select } from "@ui/components/inputs/select/Select";
import {
  avParticipationTypeLabels,
  avParticipationTypes,
  type AvParticipationType,
} from "@proclaimer-content/pages/home/av-overseer/participation/shared/constants/avParticipationTypeLabels";
import { useAvParticipants } from "@proclaimer-content/pages/home/av-overseer/participants/shared/hooks/useAvParticipants/useAvParticipants";
import { ParticipantParticipationModal } from "@proclaimer-content/pages/home/av-overseer/participants/components/participant-participation-modal/ParticipantParticipationModal";
import type { AvParticipant } from "@proclaimer-content/pages/home/av-overseer/participants/shared/hooks/useAvParticipants/useAvParticipants";

const ALL_VALUE = "all";

export function ParticipantsContent() {
  const { participants, isLoading, addParticipation, removeParticipation } = useAvParticipants();
  const [selected, setSelected] = useState<AvParticipant | null>(null);
  const [filterType, setFilterType] = useState<string>(ALL_VALUE);

  const filteredParticipants =
    filterType === ALL_VALUE
      ? participants
      : participants.filter((p) =>
          p.participations.some((ap) => ap.participation_id === filterType),
        );

  if (isLoading) {
    return (
      <IonList inset>
        {[1, 2, 3].map((i) => (
          <IonItem key={i}>
            <IonLabel>
              <IonSkeletonText style={{ width: "50%" }} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  }

  if (participants.length === 0) {
    return (
      <IonList inset>
        <IonItem>
          <IonLabel>
            <Body color="medium">No participants found.</Body>
          </IonLabel>
        </IonItem>
      </IonList>
    );
  }

  function handleToggle(participation_id: string, checked: boolean) {
    if (!selected) return;
    if (checked) {
      addParticipation(selected.participant_id, participation_id);
    } else {
      removeParticipation(selected.participant_id, participation_id);
    }
  }

  const selectOptions = [
    { label: "All Participants", value: ALL_VALUE },
    ...avParticipationTypes.map((type: AvParticipationType) => ({
      label: avParticipationTypeLabels[type],
      value: type,
    })),
  ];

  return (
    <>
      <IonList className="ion-margin" inset>
        <Select
          label="Participation Type"
          value={filterType}
          options={selectOptions}
          on_change={(value) => setFilterType(value as string)}
          interface_type="popover"
        />

        <IonItem lines="full">
          <IonLabel>
            <Body color="medium">
              {filteredParticipants.length}{" "}
              {filteredParticipants.length === 1 ? "participant" : "participants"}
            </Body>
          </IonLabel>
        </IonItem>
        {filteredParticipants.length === 0 ? (
          <IonItem lines="none">
            <IonLabel>
              <Body color="medium">No participants match this filter.</Body>
            </IonLabel>
          </IonItem>
        ) : (
          <MultiColumnList
            items={filteredParticipants}
            get_id={(p) => p.participant_id}
            gap="sm"
            render_item={(p) => (
              <IonItem button detail onClick={() => setSelected(p)}>
                <IonLabel className="ion-margin-start ion-padding-start">
                  <Body>{p.display_name}</Body>
                </IonLabel>
              </IonItem>
            )}
          />
        )}
      </IonList>
      <ParticipantParticipationModal
        participant_id={selected?.participant_id ?? ""}
        display_name={selected?.display_name ?? ""}
        active_participation_ids={selected?.participations.map((ap) => ap.participation_id) ?? []}
        is_open={selected !== null}
        on_dismiss={() => setSelected(null)}
        on_toggle={handleToggle}
      />
    </>
  );
}
