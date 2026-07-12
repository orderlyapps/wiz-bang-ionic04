import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function VendorContent() {
  return (
    <>
      <NavItem label="Ionic" to="/settings/info/util/vendor/ionic" />
      <NavItem label="react-pdf" to="/settings/info/util/vendor/react-pdf" />
      <NavItem label="Mapbox" to="/settings/info/util/vendor/mapbox" />
      <NavItem label="TanStack Query" to="/settings/info/util/vendor/react-query" />
    </>
  );
}
