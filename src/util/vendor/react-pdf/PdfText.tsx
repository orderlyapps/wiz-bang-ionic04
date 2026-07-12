import { Text, StyleSheet } from "@react-pdf/renderer";
import type { TextProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";

type Variant = "h1" | "h2" | "h3" | "body" | "caption" | "label";

type Props = PropsWithChildren<TextProps> & {
  variant?: Variant;
  bold?: boolean;
  color?: string;
};

const variantStyles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  h2: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  h3: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  body: { fontSize: 11, lineHeight: 1.5 },
  caption: { fontSize: 9, lineHeight: 1.4 },
  label: { fontSize: 10, fontWeight: "bold" },
});

export function PdfText({ children, variant = "body", bold, color, style, ...props }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = {
    ...variantStyles[variant],
    ...(bold ? { fontWeight: "bold" } : {}),
    ...(color ? { color } : {}),
    ...(style as object),
  };
  return (
    <Text style={merged} {...props}>
      {children}
    </Text>
  );
}
