import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function AppContent() {
  return (
    <>
      <NavItem label="Auth" to="/settings/info/util/app/auth" />
      <NavItem label="Feature Guard" to="/settings/info/util/app/feature-guard" />
      <NavItem label="Font Size" to="/settings/info/util/app/font-size" />
      <NavItem label="Help Text" to="/settings/info/util/app/help-text" />
      <NavItem label="Network" to="/settings/info/util/app/network" />
      <NavItem label="PWA" to="/settings/info/util/app/pwa" />
      <NavItem label="Theme" to="/settings/info/util/app/theme" />
    </>
  );
}
