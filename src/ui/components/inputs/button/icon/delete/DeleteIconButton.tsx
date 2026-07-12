import { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";

interface DeleteIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  slot?: string;
  alert_header?: string;
  alert_message?: string;
  confirm_text?: string;
  cancel_text?: string;
  skip_confirmation?: boolean;
  on_click: () => void;
}

export function DeleteIconButton({
  color = "danger",
  fill = "clear",
  size = "default",
  disabled = false,
  slot,
  alert_header = "Confirm Delete",
  alert_message = "Are you sure you want to delete this item?",
  confirm_text = "Delete",
  cancel_text = "Cancel",
  skip_confirmation = false,
  on_click,
}: DeleteIconButtonProps) {
  const [show_alert, set_show_alert] = useState(false);

  return (
    <>
      <IonButton
        color={color}
        fill={fill}
        size={size}
        disabled={disabled}
        slot={slot}
        onClick={() => (skip_confirmation ? on_click() : set_show_alert(true))}
      >
        <IonIcon slot="icon-only" icon={trash} />
      </IonButton>
      <ConfirmationAlert
        is_open={show_alert}
        header={alert_header}
        message={alert_message}
        confirm_text={confirm_text}
        confirm_color="danger"
        cancel_text={cancel_text}
        on_confirm={on_click}
        on_cancel={() => set_show_alert(false)}
      />
    </>
  );
}
