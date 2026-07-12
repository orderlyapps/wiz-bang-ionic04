import { IonList } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { ResetSettingsButton } from "@util/app/reset-settings-button/ResetSettingsButton";

export function SettingsContent() {
  return (
    <>
      <IonList>
        <NavItem label="Profile" to="/settings/profile" />
        <NavItem label="Appearance" to="/settings/appearance" />
      </IonList>
      <Space size="lg" />
      <ResetSettingsButton />
    </>
  );
}
