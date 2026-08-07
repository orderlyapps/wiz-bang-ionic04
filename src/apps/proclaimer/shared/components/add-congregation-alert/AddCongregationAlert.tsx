import { IonAlert } from "@ionic/react";

interface AddCongregationAlertProps {
  is_open: boolean;
  on_dismiss: () => void;
  on_add: (name: string) => void | Promise<void>;
}

export function AddCongregationAlert({ is_open, on_dismiss, on_add }: AddCongregationAlertProps) {
  return (
    <IonAlert
      isOpen={is_open}
      header="Add New Congregation"
      inputs={[
        {
          name: "text",
          type: "text",
          placeholder: "Congregation name",
        },
      ]}
      buttons={[
        { text: "Cancel", role: "cancel" },
        {
          text: "Save",
          handler: async (data) => {
            try {
              await on_add((data as { text: string }).text);
              return true;
            } catch {
              return false;
            }
          },
        },
      ]}
      onDidDismiss={on_dismiss}
    />
  );
}
