import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { AddVisitingSpeakerModal } from "../add-visiting-speaker-modal/AddVisitingSpeakerModal";
import type { Publisher } from "@shared/database/schemas/publisher";

interface SpeakerSelectProps {
  label: string;
  value: string | undefined;
  placeholder: string;
  local_speakers: Publisher[];
  visiting_speakers: Publisher[];
  on_change: (speaker_id: string) => void;
}

export function SpeakerSelect({
  label,
  value,
  placeholder,
  local_speakers,
  visiting_speakers,
  on_change,
}: SpeakerSelectProps) {
  const [is_open, set_is_open] = useState(false);
  const [is_add_visiting_open, set_is_add_visiting_open] = useState(false);

  const selected_speaker =
    local_speakers.find((p) => p.id === value) ?? visiting_speakers.find((p) => p.id === value);

  const display_label = selected_speaker ? getPublisherDisplayName(selected_speaker) : placeholder;

  function handleSelect(speaker_id: string) {
    on_change(speaker_id);
    set_is_open(false);
  }

  function handleSpeakerCreated(speaker_id: string) {
    handleSelect(speaker_id);
    set_is_add_visiting_open(false);
  }

  return (
    <>
      <InputWrapper label={label}>
        <IonButton fill="clear" onClick={() => set_is_open(true)}>
          {display_label}
        </IonButton>
      </InputWrapper>
      <ResponsiveModal isOpen={is_open} onDidDismiss={() => set_is_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{label}</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={() => set_is_open(false)} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <SpeakerGroup
            label="Local Speakers"
            speakers={local_speakers}
            selected_id={value}
            on_select={handleSelect}
          />
          <IonButton
            expand="block"
            className="ion-padding"
            onClick={() => set_is_add_visiting_open(true)}
          >
            Add Visiting Speaker
          </IonButton>
          <SpeakerGroup
            label="Visiting Speakers"
            speakers={visiting_speakers}
            selected_id={value}
            on_select={handleSelect}
          />
        </IonContent>
      </ResponsiveModal>
      <AddVisitingSpeakerModal
        is_open={is_add_visiting_open}
        on_dismiss={() => set_is_add_visiting_open(false)}
        on_speaker_created={handleSpeakerCreated}
      />
    </>
  );
}

interface SpeakerGroupProps {
  label: string;
  speakers: Publisher[];
  selected_id: string | undefined;
  on_select: (speaker_id: string) => void;
}

function SpeakerGroup({ label, speakers, selected_id, on_select }: SpeakerGroupProps) {
  if (speakers.length === 0) return null;

  return (
    <>
      <IonItem lines="none">
        <IonLabel color="medium">{label}</IonLabel>
      </IonItem>
      {speakers.map((speaker) => (
        <IonItem
          key={speaker.id}
          button
          detail={false}
          color={selected_id === speaker.id ? "primary" : undefined}
          onClick={() => speaker.id && on_select(speaker.id)}
        >
          <IonLabel>{getPublisherDisplayName(speaker)}</IonLabel>
        </IonItem>
      ))}
    </>
  );
}
