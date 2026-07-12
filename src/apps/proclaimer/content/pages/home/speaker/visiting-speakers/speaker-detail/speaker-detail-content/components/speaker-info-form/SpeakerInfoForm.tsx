import {
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { congregationCollection } from "@shared/database/collections/congregation";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { Congregation } from "@shared/database/schemas/congregation";

interface SpeakerInfoFormProps {
  speaker: Publisher;
}

export function SpeakerInfoForm({ speaker }: SpeakerInfoFormProps) {
  const { data: congregations_data } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).orderBy(({ c }) => c.name),
  );

  const congregations = (congregations_data as Congregation[] | undefined) ?? [];

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

  function handleCongregationChange(value: string) {
    if (!speaker.id) return;
    publisherCollection.update(speaker.id, (draft) => {
      draft.congregation_id = value;
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
      <IonItem>
        <IonSelect
          label="Congregation"
          labelPlacement="stacked"
          value={speaker.congregation_id}
          onIonChange={(e) => handleCongregationChange(e.detail.value)}
        >
          {congregations.map((c) => (
            <IonSelectOption key={c.id} value={c.id}>
              {c.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonList>
  );
}
