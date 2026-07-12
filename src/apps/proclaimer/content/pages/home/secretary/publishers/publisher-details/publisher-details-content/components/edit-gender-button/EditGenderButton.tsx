import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";

const genderOptions: { label: string; value: Publisher["gender"] }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export function EditGenderButton({
  publisher_id,
  gender,
}: {
  publisher_id: string;
  gender: Publisher["gender"];
}) {
  const [presentAlert] = useIonAlert();

  const handlePress = () => {
    void presentAlert({
      header: "Edit Gender",
      inputs: genderOptions.map((opt) => ({
        type: "radio" as const,
        label: opt.label,
        value: opt.value,
        checked: gender === opt.value,
      })),
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          role: "confirm",
          handler: (value: Publisher["gender"]) => {
            publisherCollection.update(publisher_id, (draft) => {
              draft.gender = value;
            });
          },
        },
      ],
    });
  };

  return (
    <IonButton fill="clear" onClick={handlePress}>
      <IonIcon slot="start" icon={createOutline} />
      Edit Gender
    </IonButton>
  );
}
