import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { PDFIconButton } from "@ui/components/inputs/button/icon/pdf/PDFIconButton";
import { ClamAssignmentPdf } from "../clam-assignment-pdf/ClamAssignmentPdf";
import type { ClamAssignmentPdfData } from "../clam-assignment-pdf/ClamAssignmentPdf";

type ClamAssignmentDownloadProps = {
  data: ClamAssignmentPdfData;
  filename: string;
};

export function ClamAssignmentDownload({ data, filename }: ClamAssignmentDownloadProps) {
  const [is_generating, set_is_generating] = useState(false);

  const handle_download = async () => {
    set_is_generating(true);
    try {
      const blob = await pdf(<ClamAssignmentPdf data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    } finally {
      set_is_generating(false);
    }
  };

  return <PDFIconButton on_click={handle_download} disabled={is_generating} size="small" />;
}
