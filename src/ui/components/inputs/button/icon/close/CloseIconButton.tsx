import { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";

interface CloseIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  skip_confirmation?: boolean;
  alert_header?: string;
  alert_message?: string;
  confirm_text?: string;
  cancel_text?: string;
  on_click: () => void;
}

export function CloseIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  skip_confirmation = false,
  alert_header = "Confirm Close",
  alert_message = "Are you sure you want to close? Any unsaved changes will be lost.",
  confirm_text = "Close",
  cancel_text = "Cancel",
  on_click,
}: CloseIconButtonProps) {
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
        <IonIcon slot="icon-only" icon={close} />
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
