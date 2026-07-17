import { useState } from "react";
import { IonItem, IonLabel, IonList, IonSkeletonText } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Body } from "@ui/components/display/text/body/Body";
import { avParticipationTypeLabels } from "@proclaimer-content/pages/home/av-overseer/participation/shared/constants/avParticipationTypeLabels";
import { useAvParticipants } from "@proclaimer-content/pages/home/av-overseer/participants/shared/hooks/useAvParticipants/useAvParticipants";
import { ParticipantParticipationModal } from "@proclaimer-content/pages/home/av-overseer/participants/components/participant-participation-modal/ParticipantParticipationModal";
import type { AvParticipant } from "@proclaimer-content/pages/home/av-overseer/participants/shared/hooks/useAvParticipants/useAvParticipants";

export function ParticipantsContent() {
  const { participants, isLoading, addParticipation, removeParticipation } = useAvParticipants();
  const [selected, setSelected] = useState<AvParticipant | null>(null);

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

  return (
    <>
      <IonList className="ion-margin" inset>
        <MultiColumnList
          items={participants}
          get_id={(p) => p.participant_id}
          gap="sm"
          render_item={(p) => (
            <IonItem button detail onClick={() => setSelected(p)}>
              <IonLabel className="ion-margin-start ion-padding-start">
                <h3>{p.display_name}</h3>
                <p>
                  {p.participations
                    .map(
                      (ap) =>
                        avParticipationTypeLabels[
                          ap.participation_id as keyof typeof avParticipationTypeLabels
                        ] ?? ap.participation_id,
                    )
                    .join(", ")}
                </p>
              </IonLabel>
            </IonItem>
          )}
        />
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
