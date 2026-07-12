import { IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Icon } from "@ui/components/icons/Icon";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import type { Size } from "@util/types/Size";
import { Body } from "@ui/components/display/text/body/Body";

interface NavItemProps {
  label: string;
  to: string;
  stat?: string | number;
  color?: IonicColor;
  size?: Size;
  bold?: boolean;
  italic?: boolean;
  balance?: boolean;
  pretty?: boolean;
  label_class?: "ion-text-center" | "ion-text-end";
  lines?: "full" | "inset" | "none";
}

export function NavItem({
  label,
  to,
  stat,
  color = "primary",
  size,
  bold,
  italic,
  balance,
  pretty,
  label_class,
  lines,
}: NavItemProps) {
  return (
    <IonItem routerLink={to} detail={false} button lines={lines}>
      <IonLabel className={`ion-margin ion-text-nowrap ${label_class ?? ""}`}>
        <Heading
          color={color}
          size={size}
          bold={bold}
          italic={italic}
          balance={balance}
          pretty={pretty}
        >
          {label}
        </Heading>
      </IonLabel>
      {stat !== undefined && (
        <div slot="end">
          <Body>{stat}</Body>
        </div>
      )}
      <Icon name="chevronForwardJW" slot="end" />
    </IonItem>
  );
}
