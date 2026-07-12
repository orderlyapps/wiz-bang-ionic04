import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function LetterWritingHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Letter Writing</IonTitle>
    </IonToolbar>
  );
}
