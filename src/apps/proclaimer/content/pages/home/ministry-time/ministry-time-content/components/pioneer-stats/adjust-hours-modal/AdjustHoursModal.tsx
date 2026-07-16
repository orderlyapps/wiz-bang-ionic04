import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonList,
  IonItem,
  IonText,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { getServiceYear } from "@util/format/service-year";
import { usePioneerSettings } from "../../../hooks/usePioneerSettings";
import { ServiceYearRow } from "./service-year-row/ServiceYearRow";

interface AdjustHoursModalProps {
  isOpen: boolean;
  on_close: () => void;
}

export function AdjustHoursModal({ isOpen, on_close }: AdjustHoursModalProps) {
  const { getHoursForServiceYear, setPioneerHours } = usePioneerSettings();
  const currentServiceYear = getServiceYear(new Date());
  const currentStartYear = parseInt(currentServiceYear.split("-")[0], 10);
  const serviceYears = Array.from({ length: 5 }, (_, i) => {
    const start = currentStartYear - 2 + i;
    return `${start}-${start + 1}`;
  });

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={on_close}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pioneer Hours</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_close} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonText color="medium">
              <p>
                Set the yearly hour requirement for regular pioneers per service year (Sep 1 – Aug
                31). Default is 600h.
              </p>
            </IonText>
          </IonItem>
          {serviceYears.map((sy) => (
            <ServiceYearRow
              key={sy}
              service_year={sy}
              hours={getHoursForServiceYear(sy)}
              is_current={sy === currentServiceYear}
              on_save={(hours) => setPioneerHours(sy, hours)}
            />
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
