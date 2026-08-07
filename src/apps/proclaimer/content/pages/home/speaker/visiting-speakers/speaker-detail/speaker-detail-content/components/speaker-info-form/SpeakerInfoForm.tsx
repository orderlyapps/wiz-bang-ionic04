import { IonItem, IonInput, IonList, IonListHeader, IonLabel } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { CongregationSelect } from "./components/congregation-select/CongregationSelect";

interface SpeakerInfoFormProps {
  speaker: Publisher;
}

export function SpeakerInfoForm({ speaker }: SpeakerInfoFormProps) {
  function handleFirstNameChange(value: string) {
    if (!speaker.id) return;
    publisherCollection.update(speaker.id, (draft) => {
      draft.first_name = value;
    });
  }

  function handleLastNameChange(value: string) {
    if (!speaker.id) return;
    publisherCollection.update(speaker.id, (draft) => {
      draft.last_name = value;
    });
  }

  function handleCongregationChange(congregation_id: string) {
    if (!speaker.id) return;
    publisherCollection.update(speaker.id, (draft) => {
      draft.congregation_id = congregation_id;
    });
  }

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Speaker Details</IonLabel>
      </IonListHeader>
      <IonItem>
        <IonInput
          label="First Name"
          labelPlacement="stacked"
          value={speaker.first_name}
          onIonBlur={(e) =>
            handleFirstNameChange((e.target as HTMLIonInputElement).value as string)
          }
        />
      </IonItem>
      <IonItem>
        <IonInput
          label="Last Name"
          labelPlacement="stacked"
          value={speaker.last_name}
          onIonBlur={(e) => handleLastNameChange((e.target as HTMLIonInputElement).value as string)}
        />
      </IonItem>
      <CongregationSelect value={speaker.congregation_id} on_change={handleCongregationChange} />
    </IonList>
  );
}
