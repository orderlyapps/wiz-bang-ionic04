import { useState } from "react";
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonList } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { useAllReturnVisits } from "./hooks/useAllReturnVisits";
import { SortControl, type SortMode } from "./components/sort-control/SortControl";
import { SortedList } from "./components/sorted-list/SortedList";
import type { ReturnVisit } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/return-visit-source/types";

type ReturnVisitListModalProps = {
  is_open: boolean;
  on_dismiss: () => void;
  on_select: (rv: ReturnVisit) => void;
};

export function ReturnVisitListModal({
  is_open,
  on_dismiss,
  on_select,
}: ReturnVisitListModalProps) {
  const [sort_mode, set_sort_mode] = useState<SortMode>("recent");
  const return_visits = useAllReturnVisits();

  function handleSelect(rv: ReturnVisit) {
    on_select(rv);
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Return Visits</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <SortControl value={sort_mode} on_change={set_sort_mode} />
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        {return_visits && return_visits.length > 0 ? (
          <IonList>
            <SortedList items={return_visits} sort_mode={sort_mode} on_select={handleSelect} />
          </IonList>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--ion-color-medium)" }}>
            No return visits saved yet.
          </div>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
