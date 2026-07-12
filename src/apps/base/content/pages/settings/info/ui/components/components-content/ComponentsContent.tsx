import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function ComponentsContent() {
  return (
    <>
      <NavItem label="Display" to="/settings/info/ui/components/display" />
      <NavItem label="Icons" to="/settings/info/ui/components/icons" />
      <NavItem label="Inputs" to="/settings/info/ui/components/inputs" />
      <NavItem label="Layout" to="/settings/info/ui/components/layout" />
      <NavItem label="Navigation" to="/settings/info/ui/components/navigation" />
    </>
  );
}
