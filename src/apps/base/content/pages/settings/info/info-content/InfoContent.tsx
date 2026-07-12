import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function InfoContent() {
  return (
    <>
      <NavItem label="UI" to="/settings/info/ui" />
      <NavItem label="Util" to="/settings/info/util" />
    </>
  );
}
