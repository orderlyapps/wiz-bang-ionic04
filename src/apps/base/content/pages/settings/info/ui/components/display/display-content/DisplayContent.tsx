import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function DisplayContent() {
  return (
    <>
      <NavItem label="Alert" to="/settings/info/ui/components/display/alert" />
      <NavItem label="Data" to="/settings/info/ui/components/display/data" />
      <NavItem label="Modal" to="/settings/info/ui/components/display/modal" />
      <NavItem label="Text" to="/settings/info/ui/components/display/text" />
    </>
  );
}
