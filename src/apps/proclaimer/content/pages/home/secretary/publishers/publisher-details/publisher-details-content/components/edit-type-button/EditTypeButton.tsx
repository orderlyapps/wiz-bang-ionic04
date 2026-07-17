import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";

const typeOptions: { label: string; value: Publisher["type"] }[] = [
  { label: "Publisher", value: "publisher" },
  { label: "Continuous Auxiliary", value: "continuous_auxiliary" },
  { label: "Special Pioneer", value: "special_pioneer" },
  { label: "Regular Pioneer", value: "regular_pioneer" },
  { label: "Circuit Overseer", value: "circuit_overseer" },
  { label: "Inactive", value: "inactive" },
  { label: "Associate", value: "associate" },
];

export function EditTypeButton({
  publisher_id,
  type,
}: {
  publisher_id: string;
  type: Publisher["type"];
}) {
  const [presentAlert] = useIonAlert();

  const handlePress = () => {
    void presentAlert({
      header: "Edit Type",
      inputs: typeOptions.map((opt) => ({
        type: "radio" as const,
        label: opt.label,
        value: opt.value,
        checked: type === opt.value,
      })),
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          role: "confirm",
          handler: (value: Publisher["type"]) => {
            publisherCollection.update(publisher_id, (draft) => {
              draft.type = value;
            });
          },
        },
      ],
    });
  };

  return (
    <IonButton fill="clear" onClick={handlePress}>
      <IonIcon slot="start" icon={createOutline} />
      Edit Type
    </IonButton>
  );
}
