import { IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

interface StatItemProps {
  label: string;
  value: string;
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <IonItem lines="none" className="ion-text-center ion-padding">
      <IonLabel>
        <Heading size="sm" color="medium">
          {label}
        </Heading>
        <Space size="xs" />
        <Heading size="xl" color="primary">
          {value}
        </Heading>
      </IonLabel>
    </IonItem>
  );
}
