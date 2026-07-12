import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";

const standingOptions: { label: string; value: Publisher["standing"] }[] = [
  { label: "Publisher", value: "publisher" },
  { label: "Unbaptised Publisher", value: "unbaptised_publisher" },
  { label: "Ministerial Servant", value: "ministerial_servant" },
  { label: "Elder", value: "elder" },
];

export function EditStandingButton({
  publisher_id,
  standing,
}: {
  publisher_id: string;
  standing: Publisher["standing"];
}) {
  const [presentAlert] = useIonAlert();

  const handlePress = () => {
    void presentAlert({
      header: "Edit Standing",
      inputs: standingOptions.map((opt) => ({
        type: "radio" as const,
        label: opt.label,
        value: opt.value,
        checked: standing === opt.value,
      })),
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          role: "confirm",
          handler: (value: Publisher["standing"]) => {
            publisherCollection.update(publisher_id, (draft) => {
              draft.standing = value;
            });
          },
        },
      ],
    });
  };

  return (
    <IonButton fill="clear" onClick={handlePress}>
      <IonIcon slot="start" icon={createOutline} />
      Edit Standing
    </IonButton>
  );
}
