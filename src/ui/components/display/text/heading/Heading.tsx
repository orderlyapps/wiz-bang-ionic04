import { Body } from "@ui/components/display/text/body/Body";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import type { Size } from "@util/types/Size";

interface HeadingProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: Size;
  bold?: boolean;
  italic?: boolean;
  balance?: boolean;
  pretty?: boolean;
  className?: string;
}

export function Heading({
  children,
  color = "primary",
  size = "xl",
  bold = false,
  italic = false,
  balance = false,
  pretty = false,
  className,
}: HeadingProps) {
  return (
    <Body
      color={color}
      size={size}
      bold={bold}
      italic={italic}
      balance={balance}
      pretty={pretty}
      className={className}
    >
      {children}
    </Body>
  );
}
