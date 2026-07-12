import { IonButton } from "@ionic/react";
import type { ComponentProps } from "react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

type TextButtonProps = Omit<ComponentProps<typeof IonButton>, "onClick" | "color"> & {
  label: string;
  color?: IonicColor;
  on_click?: () => void;
};

export function TextButton({
  label,
  color,
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  on_click,
  ...rest
}: TextButtonProps) {
  return (
    <IonButton
      {...rest}
      color={color}
      fill={fill}
      size={size}
      expand={expand}
      disabled={disabled}
      onClick={on_click}
      className="ion-margin-horizontal"
      style={{ maxWidth: 360, marginInline: "auto" }}
    >
      {label}
    </IonButton>
  );
}
