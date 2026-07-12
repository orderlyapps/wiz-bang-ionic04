import { IonButton, IonIcon } from "@ionic/react";
import { create } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface EditIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  slot?: string;
  on_click: () => void;
}

export function EditIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  slot,
  on_click,
}: EditIconButtonProps) {
  return (
    <IonButton
      color={color}
      fill={fill}
      size={size}
      disabled={disabled}
      slot={slot}
      onClick={on_click}
    >
      <IonIcon slot="icon-only" icon={create} />
    </IonButton>
  );
}
