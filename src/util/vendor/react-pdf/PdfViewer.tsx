import { PDFViewer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import type { ReactElement } from "react";

type Props = {
  children: ReactElement<DocumentProps>;
  width?: string | number;
  height?: string | number;
};

export function PdfViewer({ children, width = "100%", height = "100%" }: Props) {
  return (
    <PDFViewer width={width} height={height} style={{ border: "none" }}>
      {children}
    </PDFViewer>
  );
}
