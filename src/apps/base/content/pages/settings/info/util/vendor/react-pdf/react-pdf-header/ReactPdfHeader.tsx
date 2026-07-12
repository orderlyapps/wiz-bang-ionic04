import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ReactPdfHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/util/vendor" />
      </IonButtons>
      <IonTitle>react-pdf</IonTitle>
    </IonToolbar>
  );
}
