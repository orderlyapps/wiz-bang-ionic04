import { useState, cloneElement, isValidElement } from "react";
import { IonButton } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";

interface AlertIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  slot?: string;
  alert_header: string;
  alert_message: string;
  confirm_text: string;
  confirm_color?: IonicColor;
  cancel_text?: string;
  skip_confirmation?: boolean;
  on_click: () => void;
  children: React.ReactElement;
}

export function AlertIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  slot,
  alert_header,
  alert_message,
  confirm_text,
  confirm_color,
  cancel_text = "Cancel",
  skip_confirmation = false,
  on_click,
  children,
}: AlertIconButtonProps) {
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
        {isValidElement(children)
          ? cloneElement(children, { slot: "icon-only" } as object)
          : children}
      </IonButton>
      <ConfirmationAlert
        is_open={show_alert}
        header={alert_header}
        message={alert_message}
        confirm_text={confirm_text}
        confirm_color={confirm_color}
        cancel_text={cancel_text}
        on_confirm={on_click}
        on_cancel={() => set_show_alert(false)}
      />
    </>
  );
}
