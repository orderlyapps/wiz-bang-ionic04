import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function InputWrapperHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/inputs" />
      </IonButtons>
      <IonTitle>Input Wrapper</IonTitle>
    </IonToolbar>
  );
}
