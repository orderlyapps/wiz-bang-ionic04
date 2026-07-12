import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface EventsHeaderProps {
  on_add: () => void;
}

export function EventsHeader({ on_add }: EventsHeaderProps) {
  return <PermissionHeader title="Events" on_add={on_add} />;
}
