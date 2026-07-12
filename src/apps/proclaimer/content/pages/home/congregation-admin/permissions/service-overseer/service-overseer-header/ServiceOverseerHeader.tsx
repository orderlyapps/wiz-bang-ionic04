import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface ServiceOverseerHeaderProps {
  on_add: () => void;
}

export function ServiceOverseerHeader({ on_add }: ServiceOverseerHeaderProps) {
  return <PermissionHeader title="Service Overseer" on_add={on_add} />;
}
