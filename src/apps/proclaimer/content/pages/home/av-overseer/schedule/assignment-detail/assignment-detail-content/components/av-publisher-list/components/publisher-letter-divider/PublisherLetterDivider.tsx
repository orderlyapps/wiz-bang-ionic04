import { IonItemDivider, IonLabel } from "@ionic/react";

interface PublisherLetterDividerProps {
  letter: string;
}

export function PublisherLetterDivider({ letter }: PublisherLetterDividerProps) {
  return (
    <IonItemDivider>
      <IonLabel>{letter}</IonLabel>
    </IonItemDivider>
  );
}
