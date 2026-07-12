import { View } from "@react-pdf/renderer";
import type { ViewProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<ViewProps> & {
  row?: boolean;
  gap?: number;
  flex?: number;
};

export function PdfView({ children, row, gap, flex, style, ...props }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = {
    ...(row ? { flexDirection: "row" } : {}),
    ...(gap !== undefined ? { gap } : {}),
    ...(flex !== undefined ? { flex } : {}),
    ...(style as object),
  };
  return (
    <View style={merged} {...props}>
      {children}
    </View>
  );
}
