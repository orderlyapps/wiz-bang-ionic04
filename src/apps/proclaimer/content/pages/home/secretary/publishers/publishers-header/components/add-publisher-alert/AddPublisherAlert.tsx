import { IonAlert } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";

interface AddPublisherAlertProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddPublisherAlert({ is_open, on_dismiss }: AddPublisherAlertProps) {
  return (
    <IonAlert
      isOpen={is_open}
      header="Add Publisher"
      inputs={[
        { name: "first_name", placeholder: "First Name" },
        { name: "middle_name", placeholder: "Middle Name (optional)" },
        { name: "last_name", placeholder: "Last Name" },
        { name: "display_name", placeholder: "Goes By (optional)" },
      ]}
      buttons={[
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          handler: (data: {
            first_name: string;
            middle_name: string;
            last_name: string;
            display_name: string;
          }) => {
            const first_name = data.first_name.trim();
            const last_name = data.last_name.trim();
            if (!first_name || !last_name) return false;
            const congregation_id = getStoredCongregation()?.id;
            if (!congregation_id) return false;
            publisherCollection.insert({
              congregation_id,
              first_name,
              middle_name: data.middle_name.trim() || null,
              last_name,
              display_name: data.display_name.trim() || null,
              gender: "male",
              standing: "publisher",
              type: "publisher",
            });
          },
        },
      ]}
      onDidDismiss={on_dismiss}
    />
  );
}
