import { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { save } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";

interface SaveIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  alert_header?: string;
  alert_message?: string;
  confirm_text?: string;
  cancel_text?: string;
  skip_confirmation?: boolean;
  on_click: () => void;
}

export function SaveIconButton({
  color = "primary",
  fill = "clear",
  size = "default",
  disabled = false,
  alert_header = "Confirm Save",
  alert_message = "Are you sure you want to save this item?",
  confirm_text = "Save",
  cancel_text = "Cancel",
  skip_confirmation = false,
  on_click,
}: SaveIconButtonProps) {
  const [show_alert, set_show_alert] = useState(false);

  return (
    <>
      <IonButton
        color={color}
        fill={fill}
        size={size}
        disabled={disabled}
        onClick={() => (skip_confirmation ? on_click() : set_show_alert(true))}
      >
        <IonIcon slot="icon-only" icon={save} />
      </IonButton>
      <ConfirmationAlert
        is_open={show_alert}
        header={alert_header}
        message={alert_message}
        confirm_text={confirm_text}
        cancel_text={cancel_text}
        on_confirm={on_click}
        on_cancel={() => set_show_alert(false)}
      />
    </>
  );
}
