import { PermissionHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/shared/components/permission-header/PermissionHeader";

interface WeekendHeaderProps {
  on_add: () => void;
}

export function WeekendHeader({ on_add }: WeekendHeaderProps) {
  return <PermissionHeader title="Weekend" on_add={on_add} />;
}
