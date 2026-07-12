import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface TerritoryServantHeaderProps {
  on_add: () => void;
}

export function TerritoryServantHeader({ on_add }: TerritoryServantHeaderProps) {
  return <PermissionHeader title="Territory Servant" on_add={on_add} />;
}
