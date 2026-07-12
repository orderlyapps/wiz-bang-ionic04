import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface AvOverseerHeaderProps {
  on_add: () => void;
}

export function AvOverseerHeader({ on_add }: AvOverseerHeaderProps) {
  return <PermissionHeader title="AV Overseer" on_add={on_add} />;
}
