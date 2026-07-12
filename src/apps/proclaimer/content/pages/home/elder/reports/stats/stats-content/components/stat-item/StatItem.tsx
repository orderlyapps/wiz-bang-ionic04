import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";

interface StatItemProps {
  label: string;
  value: string | number;
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <IonItem lines="full">
      <IonLabel>{label}</IonLabel>
      <div slot="end">
        <Body color="primary" bold>
          {value}
        </Body>
      </div>
    </IonItem>
  );
}
