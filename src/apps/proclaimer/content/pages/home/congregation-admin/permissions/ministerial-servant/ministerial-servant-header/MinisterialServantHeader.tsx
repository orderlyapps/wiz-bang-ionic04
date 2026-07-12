import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface MinisterialServantHeaderProps {
  on_add: () => void;
}

export function MinisterialServantHeader({ on_add }: MinisterialServantHeaderProps) {
  return <PermissionHeader title="Ministerial Servant" on_add={on_add} />;
}
