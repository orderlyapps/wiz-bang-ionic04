import { Space } from "@ui/components/layout/space/Space";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";
import { ResetSettingsButton } from "@util/app/reset-settings-button/ResetSettingsButton";

export function SettingsContent() {
  return (
    <>
      <NavItem label="Appearance" to="/settings/appearance" />
      <NavItem label="Info" to="/settings/info" />
      <Space />
      <ResetSettingsButton />
    </>
  );
}
