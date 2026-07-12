import { IonItem, IonLabel } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";

interface PublisherLetterDividerProps {
  letter: string;
}

export function PublisherLetterDivider({ letter }: PublisherLetterDividerProps) {
  return (
    <IonItem lines="none" className="ion-margin">
      <IonLabel>
        <Heading>{letter}</Heading>
      </IonLabel>
    </IonItem>
  );
}
