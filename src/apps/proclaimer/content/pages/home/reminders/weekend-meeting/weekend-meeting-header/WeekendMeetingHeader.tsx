import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function WeekendMeetingHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/reminders" />
      </IonButtons>
      <IonTitle>Weekend Meeting</IonTitle>
    </IonToolbar>
  );
}
