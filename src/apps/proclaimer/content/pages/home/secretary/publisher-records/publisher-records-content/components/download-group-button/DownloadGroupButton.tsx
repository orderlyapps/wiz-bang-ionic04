import { useState } from "react";
import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import { PublisherRecordsPdf } from "../publisher-records-pdf/PublisherRecordsPdf";
import { PDFIconButton } from "@ui/components/inputs/button/icon/pdf/PDFIconButton";
import type { PublisherRecordEntry } from "../publisher-records-pdf/PublisherRecordsPdf";

interface DownloadGroupButtonProps {
  label: string;
  count: number;
  get_entries: () => PublisherRecordEntry[];
}

export function DownloadGroupButton({ label, count, get_entries }: DownloadGroupButtonProps) {
  const [is_generating, set_is_generating] = useState(false);

  const handle_download = async () => {
    const entries = get_entries();
    if (entries.length === 0) return;
    set_is_generating(true);
    try {
      const blob = await pdf(<PublisherRecordsPdf entries={entries} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${label.replace(/\s+/g, "_")}_Publisher_Records.pdf`;
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

  return (
    <IonItem>
      <IonLabel>
        {label}
        <p>{count} publishers</p>
      </IonLabel>
      {is_generating ? (
        <IonSpinner name="crescent" slot="end" />
      ) : (
        <PDFIconButton disabled={count === 0} on_click={handle_download} />
      )}
    </IonItem>
  );
}
