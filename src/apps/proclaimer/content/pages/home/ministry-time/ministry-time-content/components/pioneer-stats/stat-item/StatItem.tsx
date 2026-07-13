import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";

interface StatItemProps {
  label: string;
  value: string;
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <IonGrid className="ion-text-center ion-no-padding ">
      <IonRow className="ion-justify-content-center">
        <IonCol>
          <Heading size="sm" color="medium">
            {label}
          </Heading>
          <br />
          <Heading size="xl" color="primary">
            {value}
          </Heading>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
