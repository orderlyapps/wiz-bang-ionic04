import { useState } from "react";
import { IonSpinner, IonButton } from "@ionic/react";
import { pdf } from "@react-pdf/renderer";
import { PublisherRecordPdf } from "@proclaimer-content/pages/home/reports/reports-content/components/publisher-record-pdf/PublisherRecordPdf";
import { usePublisherRecordData } from "./hooks/usePublisherRecordData";
import { Icon } from "@ui/components/icons/Icon";

export function DownloadPublisherRecordButton({ publisher_id }: { publisher_id: string }) {
  const [is_generating, set_is_generating] = useState(false);
  const data = usePublisherRecordData(publisher_id);

  const handle_download = async () => {
    if (!data) return;
    set_is_generating(true);
    try {
      const blob = await pdf(
        <PublisherRecordPdf publisher={data.publisher} reports={data.reports} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.publisher.last_name}_Publisher_Record.pdf`;
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

  if (!data) return null;

  return (
    <IonButton fill="clear" onClick={handle_download} disabled={is_generating}>
      {is_generating ? (
        <>
          <IonSpinner name="crescent" style={{ marginRight: 8 }} />
        </>
      ) : (
        <>
          <Icon name="pdf" slot="start" />
        </>
      )}
    </IonButton>
  );
}
