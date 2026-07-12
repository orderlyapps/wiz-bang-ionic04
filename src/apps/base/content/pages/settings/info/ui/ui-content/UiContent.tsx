import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function UiContent() {
  return (
    <>
      <NavItem label="Colors" to="/settings/info/ui/colors" />
      <NavItem label="Components" to="/settings/info/ui/components" />
      <NavItem label="CSS" to="/settings/info/ui/css" />
    </>
  );
}
