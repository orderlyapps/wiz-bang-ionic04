import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function UtilContent() {
  return (
    <>
      <NavItem label="App" to="/settings/info/util/app" />
      <NavItem label="Constants" to="/settings/info/util/constants" />
      <NavItem label="Format" to="/settings/info/util/format" />
      <NavItem label="Hooks" to="/settings/info/util/hooks" />
      <NavItem label="Sort" to="/settings/info/util/sort" />
      <NavItem label="Vendor" to="/settings/info/util/vendor" />
    </>
  );
}
