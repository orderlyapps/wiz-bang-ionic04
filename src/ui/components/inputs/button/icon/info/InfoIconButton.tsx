import { IonButton, IonIcon } from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface InfoIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  on_click: () => void;
}

export function InfoIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  on_click,
}: InfoIconButtonProps) {
  return (
    <IonButton color={color} fill={fill} size={size} disabled={disabled} onClick={on_click}>
      <IonIcon slot="icon-only" icon={informationCircle} />
    </IonButton>
  );
}
