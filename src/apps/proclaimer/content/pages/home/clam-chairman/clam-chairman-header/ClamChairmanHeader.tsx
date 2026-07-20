import { lazy, Suspense } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { useChairmanWeeks } from "../useChairmanWeeks";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { Spinner } from "@ui/components/display/spinner/Spinner";

const ChairmanDownloadButtons = lazy(() =>
  import("./components/chairman-download-buttons/ChairmanDownloadButtons").then((m) => ({
    default: m.ChairmanDownloadButtons,
  })),
);

interface ClamChairmanHeaderProps {
  week_id: string;
}

export function ClamChairmanHeader({ week_id }: ClamChairmanHeaderProps) {
  const permissions = usePermissions();
  const { chairman_week_ids } = useChairmanWeeks();
  const is_overseer = permissions.has_clam_overseer;
  const download_week_ids = is_overseer ? [week_id] : chairman_week_ids;

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
      <IonTitle>CLAM Chairman</IonTitle>
      {download_week_ids.length > 0 && (
        <IonButtons slot="end">
          <Suspense fallback={<Spinner size="sm" centered={false} />}>
            <ChairmanDownloadButtons week_ids={download_week_ids} />
          </Suspense>
        </IonButtons>
      )}
    </IonToolbar>
  );
}
