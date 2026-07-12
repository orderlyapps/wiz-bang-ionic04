import { useState } from "react";
import type { ComponentProps } from "react";
import { IonButton } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

type SaveTextButtonProps = Omit<ComponentProps<typeof IonButton>, "onClick" | "color"> & {
  variant?: "save" | "update";
  label?: string;
  color?: IonicColor;
  alert_header?: string;
  alert_message?: string;
  confirm_text?: string;
  cancel_text?: string;
  skip_confirmation?: boolean;
  on_click: () => void;
};

export function SaveTextButton({
  variant = "save",
  label,
  color = "primary",
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  alert_header,
  alert_message,
  confirm_text,
  cancel_text = "Cancel",
  skip_confirmation = false,
  on_click,
  ...rest
}: SaveTextButtonProps) {
  const [show_alert, set_show_alert] = useState(false);
  const resolved_label = label ?? (variant === "update" ? "Update" : "Save");
  const resolved_header =
    alert_header ?? (variant === "update" ? "Confirm Update" : "Confirm Save");
  const resolved_message =
    alert_message ??
    (variant === "update"
      ? "Are you sure you want to update this item?"
      : "Are you sure you want to save this item?");
  const resolved_confirm = confirm_text ?? resolved_label;

  return (
    <>
      <TextButton
        {...rest}
        label={resolved_label}
        color={color}
        fill={fill}
        size={size}
        expand={expand}
        disabled={disabled}
        on_click={() => (skip_confirmation ? on_click() : set_show_alert(true))}
      />
      <ConfirmationAlert
        is_open={show_alert}
        header={resolved_header}
        message={resolved_message}
        confirm_text={resolved_confirm}
        cancel_text={cancel_text}
        on_confirm={on_click}
        on_cancel={() => set_show_alert(false)}
      />
    </>
  );
}
