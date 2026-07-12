import { IonButton } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { Icon } from "@ui/components/icons/Icon";

interface PDFIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  on_click: () => void;
}

export function PDFIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  on_click,
}: PDFIconButtonProps) {
  return (
    <IonButton color={color} fill={fill} size={size} disabled={disabled} onClick={on_click}>
      <Icon slot="icon-only" name="pdf" />
    </IonButton>
  );
}
