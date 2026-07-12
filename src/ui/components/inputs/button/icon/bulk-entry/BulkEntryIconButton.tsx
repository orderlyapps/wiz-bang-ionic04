import { IonButton, IonIcon } from "@ionic/react";
import { layersOutline } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface BulkEntryIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  slot?: string;
  routerLink: string;
}

export function BulkEntryIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  slot,
  routerLink,
}: BulkEntryIconButtonProps) {
  return (
    <IonButton
      color={color}
      fill={fill}
      size={size}
      disabled={disabled}
      slot={slot}
      routerLink={routerLink}
    >
      <IonIcon slot="icon-only" icon={layersOutline} />
    </IonButton>
  );
}
