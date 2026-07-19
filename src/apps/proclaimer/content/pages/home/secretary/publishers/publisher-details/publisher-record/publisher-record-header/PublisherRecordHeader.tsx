import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { DownloadPublisherRecordButton } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-content/components/download-publisher-record-button/DownloadPublisherRecordButton";

interface PublisherRecordHeaderProps {
  publisher_name: string;
  publisher_id: string;
  default_href: string;
}

export function PublisherRecordHeader({
  publisher_name,
  publisher_id,
  default_href,
}: PublisherRecordHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref={default_href} />
      </IonButtons>
      <IonTitle>{publisher_name}</IonTitle>
      <IonButtons slot="end">
        <DownloadPublisherRecordButton publisher_id={publisher_id} />
      </IonButtons>
    </IonToolbar>
  );
}
