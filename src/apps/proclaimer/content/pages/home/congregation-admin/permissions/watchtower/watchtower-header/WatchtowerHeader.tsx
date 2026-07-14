import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface WatchtowerHeaderProps {
  on_add: () => void;
}

export function WatchtowerHeader({ on_add }: WatchtowerHeaderProps) {
  return <PermissionHeader title="Watchtower" on_add={on_add} />;
}
