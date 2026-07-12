import { IonText } from "@ionic/react";
import type { Size } from "@util/types/Size";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import styles from "./Body.module.css";

interface BodyProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: Size;
  bold?: boolean;
  italic?: boolean;
  balance?: boolean;
  pretty?: boolean;
  className?: string;
  style?: React.CSSProperties;
  slot?: string;
}

export function Body({
  children,
  color,
  size = "md",
  bold = false,
  italic = false,
  balance = false,
  pretty = false,
  className,
  style,
  slot,
}: BodyProps) {
  const getTextStyle = () => {
    const textStyle: React.CSSProperties = {};

    switch (size) {
      case "xs":
        textStyle.fontSize = "0.75rem";
        break;
      case "sm":
        textStyle.fontSize = "0.875rem";
        break;
      case "lg":
        textStyle.fontSize = "1.125rem";
        break;
      case "xl":
        textStyle.fontSize = "1.25rem";
        break;
      case "2xl":
        textStyle.fontSize = "1.5rem";
        break;
      default: // md
        textStyle.fontSize = "1rem";
    }

    if (bold) textStyle.fontWeight = "bold";
    if (italic) textStyle.fontStyle = "italic";

    return textStyle;
  };

  const needsWrapper = balance || pretty;
  const wrapClass = balance ? styles.balance : pretty ? styles.pretty : "";

  return (
    <IonText
      {...(color && { color })}
      {...(slot && { slot })}
      style={{ ...getTextStyle(), ...style }}
      className={className}
    >
      {needsWrapper ? <span className={wrapClass}>{children}</span> : children}
    </IonText>
  );
}
