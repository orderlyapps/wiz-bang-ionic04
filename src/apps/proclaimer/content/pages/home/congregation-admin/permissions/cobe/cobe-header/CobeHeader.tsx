import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface CobeHeaderProps {
  on_add: () => void;
}

export function CobeHeader({ on_add }: CobeHeaderProps) {
  return <PermissionHeader title="COBE" on_add={on_add} />;
}
