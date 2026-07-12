import { IonActionSheet } from "@ionic/react";

export type PdfFilterType = "default" | "confidential";

interface PdfActionSheetProps {
  is_open: boolean;
  on_select: (filter: PdfFilterType) => void;
  on_dismiss: () => void;
}

export function PdfActionSheet({ is_open, on_select, on_dismiss }: PdfActionSheetProps) {
  return (
    <IonActionSheet
      isOpen={is_open}
      onDidDismiss={on_dismiss}
      header="Download PDF"
      subHeader="Select list type"
      buttons={[
        {
          text: "Notice Board",
          handler: () => {
            on_select("default");
          },
        },
        {
          text: "Confidential",
          handler: () => {
            on_select("confidential");
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            on_dismiss();
          },
        },
      ]}
    />
  );
}
