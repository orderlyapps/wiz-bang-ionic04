import { Page } from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<PageProps> & {
  padding?: number | string;
};

export function PdfPage({ children, padding = 30, style, ...props }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding,
    ...(style as object),
  };
  return (
    <Page size="A4" style={merged} {...props}>
      {children}
    </Page>
  );
}
