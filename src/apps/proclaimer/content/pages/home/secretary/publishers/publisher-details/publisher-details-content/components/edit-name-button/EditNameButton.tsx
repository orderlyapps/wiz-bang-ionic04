import { IonButton, IonIcon, useIonAlert } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { publisherCollection } from "@shared/database/collections/publisher";

export function EditNameButton({
  publisher_id,
  first_name,
  middle_name,
  last_name,
  display_name,
}: {
  publisher_id: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  display_name?: string | null;
}) {
  const [presentAlert] = useIonAlert();

  const handlePress = () => {
    void presentAlert({
      header: "Edit Name",
      inputs: [
        { name: "first_name", placeholder: "First Name", value: first_name },
        { name: "middle_name", placeholder: "Middle Name (optional)", value: middle_name ?? "" },
        { name: "last_name", placeholder: "Last Name", value: last_name },
        { name: "display_name", placeholder: "Goes By (optional)", value: display_name ?? "" },
      ],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          role: "confirm",
          handler: (data: {
            first_name: string;
            middle_name: string;
            last_name: string;
            display_name: string;
          }) => {
            publisherCollection.update(publisher_id, (draft) => {
              draft.first_name = data.first_name.trim();
              draft.middle_name = data.middle_name.trim() || null;
              draft.last_name = data.last_name.trim();
              draft.display_name = data.display_name.trim() || null;
            });
          },
        },
      ],
    });
  };

  return (
    <IonButton fill="clear" onClick={handlePress}>
      <IonIcon slot="start" icon={createOutline} />
      Edit Name
    </IonButton>
  );
}
