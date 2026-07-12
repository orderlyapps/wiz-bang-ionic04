import { useState } from "react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

interface DeleteTextButtonProps {
  label?: string;
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  expand?: "block" | "full";
  disabled?: boolean;
  alert_header?: string;
  alert_message?: string;
  confirm_text?: string;
  cancel_text?: string;
  on_click: () => void;
}

export function DeleteTextButton({
  label = "Delete",
  color = "danger",
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  alert_header = "Confirm Delete",
  alert_message = "Are you sure you want to delete this item?",
  confirm_text = "Delete",
  cancel_text = "Cancel",
  on_click,
}: DeleteTextButtonProps) {
  const [show_alert, set_show_alert] = useState(false);

  return (
    <>
      <TextButton
        label={label}
        color={color}
        fill={fill}
        size={size}
        expand={expand}
        disabled={disabled}
        on_click={() => set_show_alert(true)}
      />
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
