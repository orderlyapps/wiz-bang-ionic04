import { lazy, Suspense } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { useChairmanWeeks } from "../useChairmanWeeks";
import { Spinner } from "@ui/components/display/spinner/Spinner";

const ChairmanDownloadButtons = lazy(() =>
  import("./components/chairman-download-buttons/ChairmanDownloadButtons").then((m) => ({
    default: m.ChairmanDownloadButtons,
  })),
);

export function ClamChairmanHeader() {
  const { chairman_week_ids } = useChairmanWeeks();

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
      <IonTitle>CLAM Chairman</IonTitle>
      {chairman_week_ids.length > 0 && (
        <IonButtons slot="end">
          <Suspense fallback={<Spinner size="sm" centered={false} />}>
            <ChairmanDownloadButtons week_ids={chairman_week_ids} />
          </Suspense>
        </IonButtons>
      )}
    </IonToolbar>
  );
}
