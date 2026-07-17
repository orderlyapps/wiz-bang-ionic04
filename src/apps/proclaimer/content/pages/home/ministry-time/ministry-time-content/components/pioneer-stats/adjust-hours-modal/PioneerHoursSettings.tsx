import { IonList, IonItem, IonText } from "@ionic/react";
import { getServiceYear } from "@util/format/service-year";
import { usePioneerSettings } from "../../../hooks/usePioneerSettings";
import { ServiceYearInput } from "./service-year-input/ServiceYearInput";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";

export function PioneerHoursSettings() {
  const { settings, getHoursForServiceYear, setPioneerHours } = usePioneerSettings();
  const currentServiceYear = getServiceYear(new Date());

  const previousYearsWithData = settings
    .filter((s) => s.service_year < currentServiceYear)
    .map((s) => s.service_year)
    .sort((a, b) => b.localeCompare(a));

  const serviceYears = [currentServiceYear, ...previousYearsWithData];

  return (
    <IonList>
      <IonItem>
        <IonText color="medium">
          <Body size="sm">Adjust if starting mid-service year</Body>
        </IonText>
      </IonItem>
      {serviceYears.map((sy) => (
        <ServiceYearInput
          key={sy}
          service_year={sy}
          hours={getHoursForServiceYear(sy)}
          is_current={sy === currentServiceYear}
          on_save={(hours) => setPioneerHours(sy, hours)}
        />
      ))}

      <Space size="2xl" />
    </IonList>
  );
}
