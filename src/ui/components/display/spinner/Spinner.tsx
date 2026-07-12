import { IonSpinner } from "@ionic/react";
import type { Size } from "@util/types/Size";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface SpinnerProps {
  color?: IonicColor;
  size?: Size;
  centered?: boolean;
  className?: string;
}

const sizeToPixels = {
  xs: 12,
  sm: 16,
  md: 28,
  lg: 48,
  xl: 64,
  "2xl": 96,
};

export function Spinner({ color, size = "md", centered = true, className }: SpinnerProps) {
  const style: React.CSSProperties = {
    width: sizeToPixels[size],
    height: sizeToPixels[size],
    ...(centered && { display: "block", margin: "auto" }),
  };

  return <IonSpinner color={color} style={style} className={className} />;
}
