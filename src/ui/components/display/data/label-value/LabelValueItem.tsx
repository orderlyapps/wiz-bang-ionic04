import type { ReactNode } from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Label } from "@ui/components/display/text/label/Label";
import type { LabelValue } from "@util/types/LabelValue";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import type { Size } from "@util/types/Size";

interface LabelValueItemProps extends Partial<LabelValue> {
  label: string;
  label_color?: IonicColor;
  label_size?: Size;
  value_color?: IonicColor;
  value_size?: Size;
  value_2?: string;
  value_2_color?: IonicColor;
  value_2_size?: Size;
  detail?: boolean;
  router_link?: string;
  on_click?: () => void;
  end_detail?: ReactNode;
}

export function LabelValueItem({
  label,
  value,
  label_color = "medium",
  label_size = "sm",
  value_color,
  value_size,
  value_2,
  value_2_color,
  value_2_size = "sm",
  detail = false,
  router_link,
  on_click,
  end_detail,
}: LabelValueItemProps) {
  return (
    <IonItem
      style={{ maxWidth: 480, marginInline: "auto" }}
      routerLink={router_link}
      detail={detail}
      onClick={on_click}
    >
      <IonLabel style={{ minWidth: 0, overflow: "hidden" }}>
        <div
          style={{
            paddingLeft: "1rem",
            textIndent: "-1rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Label color={label_color} size={label_size}>
            {label}
          </Label>
        </div>
        {value && (
          <div
            style={{
              paddingLeft: "1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Body color={value_color} size={value_size}>
              {value}
            </Body>
          </div>
        )}
        {value_2 && (
          <div
            style={{
              paddingLeft: "1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Body color={value_2_color} size={value_2_size}>
              {value_2}
            </Body>
          </div>
        )}
      </IonLabel>
      {end_detail && (
        <div slot="end" onClick={(e) => e.stopPropagation()} style={{ display: "contents" }}>
          {end_detail}
        </div>
      )}
    </IonItem>
  );
}
