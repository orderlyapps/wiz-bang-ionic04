import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface ClamOverseerHeaderProps {
  on_add: () => void;
}

export function ClamOverseerHeader({ on_add }: ClamOverseerHeaderProps) {
  return <PermissionHeader title="CLAM Overseer" on_add={on_add} />;
}
