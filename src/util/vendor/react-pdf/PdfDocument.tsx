import { Document } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<DocumentProps>;

export function PdfDocument({ children, ...props }: Props) {
  return <Document {...props}>{children}</Document>;
}
