import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface ElderHeaderProps {
  on_add: () => void;
}

export function ElderHeader({ on_add }: ElderHeaderProps) {
  return <PermissionHeader title="Elder" on_add={on_add} />;
}
