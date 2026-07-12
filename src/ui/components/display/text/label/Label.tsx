import { Body } from "@ui/components/display/text/body/Body";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import type { Size } from "@util/types/Size";

interface LabelProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: Size;
  bold?: boolean;
  italic?: boolean;
  balance?: boolean;
  pretty?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Label({
  children,
  color,
  size = "sm",
  bold = true,
  italic = false,
  balance = false,
  pretty = false,
  className,
  style,
}: LabelProps) {
  return (
    <Body
      color={color}
      size={size}
      bold={bold}
      italic={italic}
      balance={balance}
      pretty={pretty}
      className={className}
      style={style}
    >
      {children}
    </Body>
  );
}
