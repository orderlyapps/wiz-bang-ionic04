import { IonList, IonItem, IonText } from "@ionic/react";
import { getServiceYear } from "@util/format/service-year";
import { usePioneerSettings } from "../../../hooks/usePioneerSettings";
import { ServiceYearRow } from "./service-year-row/ServiceYearRow";

export function PioneerHoursSettings() {
  const { getHoursForServiceYear, setPioneerHours } = usePioneerSettings();
  const currentServiceYear = getServiceYear(new Date());
  const currentStartYear = parseInt(currentServiceYear.split("-")[0], 10);
  const serviceYears = Array.from({ length: 5 }, (_, i) => {
    const start = currentStartYear - 2 + i;
    return `${start}-${start + 1}`;
  });

  return (
    <IonList>
      <IonItem>
        <IonText color="medium">
          <p>
            Set the yearly hour requirement for regular pioneers per service year (Sep 1 – Aug 31).
            Default is 600h.
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
  );
}
