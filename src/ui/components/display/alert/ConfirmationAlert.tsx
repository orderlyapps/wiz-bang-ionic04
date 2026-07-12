import { IonAlert } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface ConfirmationAlertProps {
  is_open: boolean;
  header: string;
  message: string;
  confirm_text: string;
  confirm_color?: IonicColor;
  cancel_text: string;
  on_confirm: () => void;
  on_cancel: () => void;
}

export function ConfirmationAlert({
  is_open,
  header,
  message,
  confirm_text,
  confirm_color,
  cancel_text,
  on_confirm,
  on_cancel,
}: ConfirmationAlertProps) {
  return (
    <IonAlert
      isOpen={is_open}
      onDidDismiss={on_cancel}
      header={header}
      message={message}
      buttons={[
        { text: cancel_text, role: "cancel" },
        {
          text: confirm_text,
          role: confirm_color ? "destructive" : undefined,
          handler: on_confirm,
        },
      ]}
    />
  );
}
