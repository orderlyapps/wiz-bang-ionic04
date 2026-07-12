import { IonButton } from "@ionic/react";
import { Packer, type Document } from "docx";

interface DocXDownloadButtonProps {
  doc: Document;
  fileName: string;
  label?: string;
}

export function DocXDownloadButton({ doc, fileName, label = "Download" }: DocXDownloadButtonProps) {
  const handleDownload = async () => {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <IonButton onClick={handleDownload} fill="clear" size="small">
      {label}
    </IonButton>
  );
}
