import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function SearchHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Search</IonTitle>
    </IonToolbar>
  );
}
