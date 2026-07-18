import { useState } from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { SettingsIconButton } from "@ui/components/inputs/button/icon/settings/SettingsIconButton";
import { SmsSettingsModal } from "./components/sms-settings-modal/SmsSettingsModal";

export function WeekendMeetingHeader() {
  const [settings_open, set_settings_open] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/reminders" />
        </IonButtons>
        <IonTitle>Weekend Meeting</IonTitle>
        <IonButtons slot="end">
          <SettingsIconButton on_click={() => set_settings_open(true)} />
        </IonButtons>
      </IonToolbar>
      <SmsSettingsModal is_open={settings_open} on_dismiss={() => set_settings_open(false)} />
    </>
  );
}
